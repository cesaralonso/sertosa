const Solicitudeprovider_product = {};

Solicitudeprovider_product.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider_product.*, _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider as solicitudeprovider_solicitudeprovider_idsolicitudeprovider , _product_idproduct.name as product_product_idproduct 
             FROM solicitudeprovider_product 
             INNER JOIN solicitudeprovider as _solicitudeprovider_idsolicitudeprovider ON _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider = solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudeprovider_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider_product.created_by ` : ""} 
             WHERE solicitudeprovider_product.is_deleted = false 
                  AND solicitudeprovider_product.product_idproduct = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider_product.created_by = ?` : ""}`
        keys = [idProduct];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product encontrad@' });
    });
};

Solicitudeprovider_product.findByIdSolicitudeprovider = (idSolicitudeprovider, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider_product.*, _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider as solicitudeprovider_solicitudeprovider_idsolicitudeprovider , _product_idproduct.name as product_product_idproduct 
             FROM solicitudeprovider_product 
             INNER JOIN solicitudeprovider as _solicitudeprovider_idsolicitudeprovider ON _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider = solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudeprovider_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider_product.created_by ` : ""} 
             WHERE solicitudeprovider_product.is_deleted = false 
                  AND solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider_product.created_by = ?` : ""}`
        keys = [idSolicitudeprovider];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product encontrad@' });
    });
};

Solicitudeprovider_product.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider_product.*, _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider as solicitudeprovider_solicitudeprovider_idsolicitudeprovider , _product_idproduct.name as product_product_idproduct 
             FROM solicitudeprovider_product 
             INNER JOIN solicitudeprovider as _solicitudeprovider_idsolicitudeprovider ON _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider = solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudeprovider_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider_product.created_by ` : ""} 
             WHERE solicitudeprovider_product.is_deleted = false 
                  AND solicitudeprovider_product.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider_product.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product leíd@' });
    });
};

Solicitudeprovider_product.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider_product.*, _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider as solicitudeprovider_solicitudeprovider_idsolicitudeprovider , _product_idproduct.name as product_product_idproduct 
             FROM solicitudeprovider_product 
             INNER JOIN solicitudeprovider as _solicitudeprovider_idsolicitudeprovider ON _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider = solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudeprovider_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider_product.created_by ` : ""} 
             WHERE solicitudeprovider_product.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider_product.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product leíd@' });
    });
};

Solicitudeprovider_product.findById = (idSolicitudeprovider_product, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider_product.*, _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider as solicitudeprovider_solicitudeprovider_idsolicitudeprovider , _product_idproduct.name as product_product_idproduct 
             FROM solicitudeprovider_product 
             INNER JOIN solicitudeprovider as _solicitudeprovider_idsolicitudeprovider ON _solicitudeprovider_idsolicitudeprovider.idsolicitudeprovider = solicitudeprovider_product.solicitudeprovider_idsolicitudeprovider INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = solicitudeprovider_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider_product.created_by ` : ""} 
             WHERE solicitudeprovider_product.is_deleted = false 
                  AND idsolicitudeprovider_product = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider_product.created_by = ?` : ""}`
        keys = [idSolicitudeprovider_product];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product encontrad@' });
    });
};

Solicitudeprovider_product.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsolicitudeprovider_product) AS count FROM solicitudeprovider_product`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product contabilizad@' });
    });
};

Solicitudeprovider_product.exist = (idSolicitudeprovider_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM solicitudeprovider_product WHERE idsolicitudeprovider_product = ?) AS exist`;
    keys = [idSolicitudeprovider_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product verificad@' });
    });
};

Solicitudeprovider_product.insert = (Solicitudeprovider_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO solicitudeprovider_product SET ?`;
    keys = [Solicitudeprovider_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product cread@' });
    });
};

Solicitudeprovider_product.update = (Solicitudeprovider_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudeprovider_product SET ? WHERE idsolicitudeprovider_product = ? AND created_by = ?`;
        keys = [Solicitudeprovider_product, Solicitudeprovider_product.idsolicitudeprovider_product, created_by];
    } else {
        query = `UPDATE solicitudeprovider_product SET ? WHERE idsolicitudeprovider_product = ?`;
        keys = [Solicitudeprovider_product, Solicitudeprovider_product.idsolicitudeprovider_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product actualizad@' });
    });
};

Solicitudeprovider_product.remove = (idsolicitudeprovider_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM solicitudeprovider_product WHERE idsolicitudeprovider_product = ? AND created_by = ?`;
        keys = [idsolicitudeprovider_product, created_by];
    } else {
        query = `DELETE FROM solicitudeprovider_product WHERE idsolicitudeprovider_product = ?`;
        keys = [idsolicitudeprovider_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product eliminad@' });
    });
};

Solicitudeprovider_product.logicRemove = (idsolicitudeprovider_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudeprovider_product SET is_deleted = 1 WHERE idsolicitudeprovider_product = ? AND created_by = ?`;
        keys = [idsolicitudeprovider_product, created_by];
    } else {
        query = `UPDATE solicitudeprovider_product SET is_deleted = 1 WHERE idsolicitudeprovider_product = ?`;
        keys = [idsolicitudeprovider_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider_product eliminad@' });
    });
};

Solicitudeprovider_product.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Solicitudeprovider_product;
