from flask import Flask, jsonify, request
from flask_cors import CORS
from conexion import ConexionDB
import os

app = Flask(__name__)
CORS(app) 

app.config['MYSQL_HOST'] = 'centerbeam.proxy.rlwy.net'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Cheesecake'
app.config['MYSQL_DB'] = 'BD_SUGARRUSH'

db = ConexionDB(
    app.config['MYSQL_HOST'],
    app.config['MYSQL_USER'],
    app.config['MYSQL_PASSWORD'],
    app.config['MYSQL_DB']
)

@app.route('/login', methods=['POST'])
def login():
    try:
        datos = request.json
        cursor = db.obtener_cursor()
        
        sql = "SELECT * FROM USUARIOS WHERE username=%s AND userpass=%s"
        cursor.execute(sql, (datos['usuario'], datos['contrasena']))
        user = cursor.fetchone()
        
        cursor.close()
        
        if user:
            return jsonify({"mensaje": "Bienvenido", "exito": True}), 200
        return jsonify({"mensaje": "Error de credenciales", "exito": False}), 401
        
    except Exception as e:
        return jsonify({"mensaje": "Verifique sus credenciales", "error": str(e)}), 500


@app.route('/productos', methods=['GET'])
def listar_productos():
    try:
        cursor = db.obtener_cursor()
        cursor.execute("SELECT id, nombre, descripcion, precio, img, stock FROM PRODUCTOS")
        datos = cursor.fetchall()
        
        productos = [
            {'id': f[0], 'nombre': f[1], 'descripcion': f[2], 'precio': float(f[3]), 'img': f[4], 'stock': f[5]} 
            for f in datos
        ]
        
        cursor.close()
        return jsonify(productos)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/productos', methods=['POST'])
def agregar_producto():
    try:
        datos = request.json
        cursor = db.obtener_cursor()
        
        sql = "INSERT INTO PRODUCTOS (nombre, descripcion, precio, img, stock) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            datos['nombre'], 
            datos['descripcion'], 
            datos['precio'], 
            datos['img'], 
            datos['stock']
        ))
        
        db.conexion.commit()
        cursor.close()
        
        return jsonify({'mensaje': 'Producto agregado con éxito', 'exito': True}), 201
    except Exception as e:
        return jsonify({'error': str(e), 'exito': False}), 500


@app.route('/productos/<int:id>', methods=['PUT'])
def actualizar_producto(id):
    try:
        datos = request.json
        cursor = db.obtener_cursor()
        
        sql = """UPDATE PRODUCTOS SET nombre =%s, descripcion= %s, precio= %s, img= %s, 
                stock= %s WHERE id= %s"""
        values = (datos['nombre'], datos['descripcion'], datos['precio'], datos['img'], datos['stock'], id)
        cursor.execute(sql, values)
        
        db.conexion.commit()
        cursor.close()
        
        return jsonify({'mensaje': 'Producto actualizado', 'exito': True}), 200
        
    except Exception as e:
        return jsonify({'error': str(e), 'exito': False}), 500


@app.route('/productos/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    try:
        cursor = db.obtener_cursor()    
        
        sql="""DELETE FROM PRODUCTOS WHERE id=%s"""
        # Se corrigió para que id viaje como tupla: (id,)
        cursor.execute(sql, (id,))
        
        db.conexion.commit()
        cursor.close()
            
        return jsonify({'mensaje': 'Producto eliminado', 'exito': True}), 200
        
    except Exception as e:
        return jsonify({'error': str(e), 'exito': False}), 500


if __name__ == '__main__':
    puerto = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=puerto, debug=True)