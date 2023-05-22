const Orderin = {};

Orderin.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.product_idproduct = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idProduct];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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

Orderin.findInventaryByIdWarehouse = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `
    SELECT oi.*, p.*, p.name as product_product_idproduct, w.name as warehouse_warehouse_idwarehouse, pr.name as provider_provider_idprovider,
        IFNULL(SUM(oi.quantity), 0) as sumquantityin,

        IFNULL((SELECT SUM(oo.quantity) FROM orderout as oo 
            WHERE oo.is_deleted = false 
            AND oo.product_idproduct = oi.product_idproduct
            AND oo.warehouse_idwarehouse = oi.warehouse_idwarehouse  ), 0) as sumquantityout,

            (IFNULL(SUM(oi.quantity), 0)) 
            -
            IFNULL((SELECT SUM(oo.quantity) FROM orderout as oo 
            WHERE oo.is_deleted = false 
            AND oo.product_idproduct = oi.product_idproduct
            AND oo.warehouse_idwarehouse = oi.warehouse_idwarehouse  ), 0) as quantity

                FROM orderin as oi
                INNER JOIN product as p ON p.idproduct = oi.product_idproduct
                INNER JOIN warehouse as w ON w.idwarehouse = oi.warehouse_idwarehouse
                INNER JOIN provider as pr ON pr.idprovider = p.provider_idprovider

                ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = oi.created_by ` : ""} 
                WHERE oi.is_deleted = false 
                     AND oi.warehouse_idwarehouse = ? 
                     ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                     ${only_own ? `AND oi.created_by = ?` : ""}
                     
                 GROUP BY oi.product_idproduct`

        keys = [idWarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orderin encontrado' });
    });
};

Orderin.findByIdWarehouse = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT orderin.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.warehouse_idwarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idWarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT orderin.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND orderin.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT orderin.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT orderin.*, _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse , _product_idproduct.name as product_product_idproduct 
             FROM orderin 
             INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = orderin.warehouse_idwarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = orderin.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = orderin.created_by ` : ""} 
             WHERE orderin.is_deleted = false 
                  AND idorderin = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND orderin.created_by = ?` : ""}`
        keys = [idOrderin];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
