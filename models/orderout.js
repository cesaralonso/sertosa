const Orderout = {};

Orderout.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderout.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderout 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderout.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderout.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderout.created_by ` : ""} 
             WHERE orderout.is_deleted = false 
                  AND orderout.product_idproduct = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderout.created_by = ?` : ""}`
        keys = [idProduct];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout encontrad@' });
    });
};

Orderout.findByIdWarehouse = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderout.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderout 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderout.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderout.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderout.created_by ` : ""} 
             WHERE orderout.is_deleted = false 
                  AND orderout.warehouse_idwarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderout.created_by = ?` : ""}`
        keys = [idWarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout encontrad@' });
    });
};

Orderout.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderout.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderout 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderout.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderout.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderout.created_by ` : ""} 
             WHERE orderout.is_deleted = false 
                  AND orderout.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderout.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout leíd@' });
    });
};

Orderout.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderout.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderout 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderout.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderout.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderout.created_by ` : ""} 
             WHERE orderout.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderout.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout leíd@' });
    });
};

Orderout.findById = (idOrderout, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderout.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderout 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderout.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderout.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderout.created_by ` : ""} 
             WHERE orderout.is_deleted = false 
                  AND idorderout = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderout.created_by = ?` : ""}`
        keys = [idOrderout];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout encontrad@' });
    });
};

Orderout.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idorderout) AS count FROM orderout`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orderout contabilizad@' });
    });
};

Orderout.exist = (idOrderout, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM orderout WHERE idorderout = ?) AS exist`;
    keys = [idOrderout];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orderout verificad@' });
    });
};

Orderout.insert = (Orderout, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO orderout SET ?`;
    keys = [Orderout];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Orderout cread@' });
    });
};

Orderout.update = (Orderout, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE orderout SET ? WHERE idorderout = ? AND created_by = ?`;
        keys = [Orderout, Orderout.idorderout, created_by];
    } else {
        query = `UPDATE orderout SET ? WHERE idorderout = ?`;
        keys = [Orderout, Orderout.idorderout];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout actualizad@' });
    });
};

Orderout.remove = (idorderout, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM orderout WHERE idorderout = ? AND created_by = ?`;
        keys = [idorderout, created_by];
    } else {
        query = `DELETE FROM orderout WHERE idorderout = ?`;
        keys = [idorderout];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout eliminad@' });
    });
};

Orderout.logicRemove = (idorderout, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE orderout SET is_deleted = 1 WHERE idorderout = ? AND created_by = ?`;
        keys = [idorderout, created_by];
    } else {
        query = `UPDATE orderout SET is_deleted = 1 WHERE idorderout = ?`;
        keys = [idorderout];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderout eliminad@' });
    });
};

Orderout.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orderout;
