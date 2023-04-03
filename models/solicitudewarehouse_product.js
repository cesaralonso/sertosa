const Solicitudewarehouse_product = {};

Solicitudewarehouse_product.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse_product.*, _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse as solicitudewarehouse_solicitudewarehouse_idsolicitudewarehouse , _product_idproduct.name as product_product_idproduct 
             FROM solicitudewarehouse_product 
             INNER JOIN solicitudewarehouse as _solicitudewarehouse_idsolicitudewarehouse ON _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse = solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudewarehouse_product.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse_product.created_by ` : ""} 
             WHERE solicitudewarehouse_product.is_deleted = false 
                  AND solicitudewarehouse_product.product_idproduct = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse_product.created_by = ?` : ""}`
        keys = [idProduct];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product encontrad@' });
    });
};

Solicitudewarehouse_product.findByIdSolicitudewarehouse = (idSolicitudewarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse_product.*, _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse as solicitudewarehouse_solicitudewarehouse_idsolicitudewarehouse , _product_idproduct.name as product_product_idproduct 
             FROM solicitudewarehouse_product 
             INNER JOIN solicitudewarehouse as _solicitudewarehouse_idsolicitudewarehouse ON _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse = solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudewarehouse_product.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse_product.created_by ` : ""} 
             WHERE solicitudewarehouse_product.is_deleted = false 
                  AND solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse_product.created_by = ?` : ""}`
        keys = [idSolicitudewarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product encontrad@' });
    });
};

Solicitudewarehouse_product.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse_product.*, _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse as solicitudewarehouse_solicitudewarehouse_idsolicitudewarehouse , _product_idproduct.name as product_product_idproduct 
             FROM solicitudewarehouse_product 
             INNER JOIN solicitudewarehouse as _solicitudewarehouse_idsolicitudewarehouse ON _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse = solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudewarehouse_product.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse_product.created_by ` : ""} 
             WHERE solicitudewarehouse_product.is_deleted = false 
                  AND solicitudewarehouse_product.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse_product.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product leíd@' });
    });
};

Solicitudewarehouse_product.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse_product.*, _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse as solicitudewarehouse_solicitudewarehouse_idsolicitudewarehouse , _product_idproduct.name as product_product_idproduct 
             FROM solicitudewarehouse_product 
             INNER JOIN solicitudewarehouse as _solicitudewarehouse_idsolicitudewarehouse ON _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse = solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudewarehouse_product.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse_product.created_by ` : ""} 
             WHERE solicitudewarehouse_product.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse_product.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product leíd@' });
    });
};

Solicitudewarehouse_product.findById = (idSolicitudewarehouse_product, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse_product.*, _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse as solicitudewarehouse_solicitudewarehouse_idsolicitudewarehouse , _product_idproduct.name as product_product_idproduct 
             FROM solicitudewarehouse_product 
             INNER JOIN solicitudewarehouse as _solicitudewarehouse_idsolicitudewarehouse ON _solicitudewarehouse_idsolicitudewarehouse.idsolicitudewarehouse = solicitudewarehouse_product.solicitudewarehouse_idsolicitudewarehouse INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudewarehouse_product.product_idproduct 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse_product.created_by ` : ""} 
             WHERE solicitudewarehouse_product.is_deleted = false 
                  AND idsolicitudewarehouse_product = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse_product.created_by = ?` : ""}`
        keys = [idSolicitudewarehouse_product];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product encontrad@' });
    });
};

Solicitudewarehouse_product.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsolicitudewarehouse_product) AS count FROM solicitudewarehouse_product`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product contabilizad@' });
    });
};

Solicitudewarehouse_product.exist = (idSolicitudewarehouse_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM solicitudewarehouse_product WHERE idsolicitudewarehouse_product = ?) AS exist`;
    keys = [idSolicitudewarehouse_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product verificad@' });
    });
};

Solicitudewarehouse_product.insert = (Solicitudewarehouse_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO solicitudewarehouse_product SET ?`;
    keys = [Solicitudewarehouse_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product cread@' });
    });
};

Solicitudewarehouse_product.update = (Solicitudewarehouse_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudewarehouse_product SET ? WHERE idsolicitudewarehouse_product = ? AND created_by = ?`;
        keys = [Solicitudewarehouse_product, Solicitudewarehouse_product.idsolicitudewarehouse_product, created_by];
    } else {
        query = `UPDATE solicitudewarehouse_product SET ? WHERE idsolicitudewarehouse_product = ?`;
        keys = [Solicitudewarehouse_product, Solicitudewarehouse_product.idsolicitudewarehouse_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product actualizad@' });
    });
};

Solicitudewarehouse_product.remove = (idsolicitudewarehouse_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM solicitudewarehouse_product WHERE idsolicitudewarehouse_product = ? AND created_by = ?`;
        keys = [idsolicitudewarehouse_product, created_by];
    } else {
        query = `DELETE FROM solicitudewarehouse_product WHERE idsolicitudewarehouse_product = ?`;
        keys = [idsolicitudewarehouse_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product eliminad@' });
    });
};

Solicitudewarehouse_product.logicRemove = (idsolicitudewarehouse_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudewarehouse_product SET is_deleted = 1 WHERE idsolicitudewarehouse_product = ? AND created_by = ?`;
        keys = [idsolicitudewarehouse_product, created_by];
    } else {
        query = `UPDATE solicitudewarehouse_product SET is_deleted = 1 WHERE idsolicitudewarehouse_product = ?`;
        keys = [idsolicitudewarehouse_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse_product eliminad@' });
    });
};

Solicitudewarehouse_product.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Solicitudewarehouse_product;
