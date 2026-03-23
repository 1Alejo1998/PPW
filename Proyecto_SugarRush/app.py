from flask import Flask, jsonify, request
from flask_cors import CORS
from conexion import ConexionDB

app = Flask(__name__)

CORS(app) 


db = ConexionDB('localhost', 'root', 'Sahelmendoza22', 'BD_SUGARRUSH')


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

if __name__ == '__main__':
   
    app.run(debug=True, port=5000)
