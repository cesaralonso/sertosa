const Orderin = {};

Orderin.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse. as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.product_idproduct = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idProduct];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin encontrad@' });
    });
};

Orderin.findByIdWarehouse = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse. as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.warehouse_idwarehouse = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idWarehouse];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin encontrad@' });
    });
};

Orderin.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse. as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin leíd@' });
    });
};

Orderin.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse. as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin leíd@' });
    });
};

Orderin.findById = (idOrderin, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse. as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND idorderin = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idOrderin];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin encontrad@' });
    });
};

Orderin.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idorderin) AS count FROM orderin`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orderin contabilizad@' });
    });
};

Orderin.exist = (idOrderin, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM orderin WHERE idorderin = ?) AS exist`;
    keys = [idOrderin];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orderin verificad@' });
    });
};

Orderin.insert = (Orderin, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO orderin SET ?`;
    keys = [Orderin];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Orderin cread@' });
    });
};

Orderin.update = (Orderin, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE orderin SET ? WHERE idorderin = ? AND created_by = ?`;
        keys = [Orderin, Orderin.idorderin, created_by];
    } else {
        query = `UPDATE orderin SET ? WHERE idorderin = ?`;
        keys = [Orderin, Orderin.idorderin];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin actualizad@' });
    });
};

Orderin.remove = (idorderin, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM orderin WHERE idorderin = ? AND created_by = ?`;
        keys = [idorderin, created_by];
    } else {
        query = `DELETE FROM orderin WHERE idorderin = ?`;
        keys = [idorderin];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin eliminad@' });
    });
};

Orderin.logicRemove = (idorderin, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE orderin SET is_deleted = 1 WHERE idorderin = ? AND created_by = ?`;
        keys = [idorderin, created_by];
    } else {
        query = `UPDATE orderin SET is_deleted = 1 WHERE idorderin = ?`;
        keys = [idorderin];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin eliminad@' });
    });
};

Orderin.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orderin;
