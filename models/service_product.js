const Service_product = {};

Service_product.findByIdProduct = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_product.*, _service_idservice.name as service_service_idservice , _product_idproduct.name as product_product_idproduct 
             FROM service_product 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = service_product.service_idservice INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = service_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_product.created_by ` : ""} 
             WHERE service_product.is_deleted = false 
                  AND service_product.product_idproduct = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_product.created_by = ?` : ""}`
        keys = [idProduct];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product encontrad@' });
    });
};

Service_product.findByIdService = (idService, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_product.*, _service_idservice.name as service_service_idservice , _product_idproduct.name as product_product_idproduct 
             FROM service_product 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = service_product.service_idservice INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = service_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_product.created_by ` : ""} 
             WHERE service_product.is_deleted = false 
                  AND service_product.service_idservice = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_product.created_by = ?` : ""}`
        keys = [idService];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product encontrad@' });
    });
};

Service_product.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_product.*, _service_idservice.name as service_service_idservice , _product_idproduct.name as product_product_idproduct 
             FROM service_product 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = service_product.service_idservice INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = service_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_product.created_by ` : ""} 
             WHERE service_product.is_deleted = false 
                  AND service_product.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_product.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product leíd@' });
    });
};

Service_product.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_product.*, _service_idservice.name as service_service_idservice , _product_idproduct.name as product_product_idproduct 
             FROM service_product 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = service_product.service_idservice INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = service_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_product.created_by ` : ""} 
             WHERE service_product.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_product.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product leíd@' });
    });
};

Service_product.findById = (idService_product, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_product.*, _service_idservice.name as service_service_idservice , _product_idproduct.name as product_product_idproduct 
             FROM service_product 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = service_product.service_idservice INNER JOIN product as _product_idproduct ON _product_idproduct.idproduct = service_product.product_idproduct 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_product.created_by ` : ""} 
             WHERE service_product.is_deleted = false 
                  AND idservice_product = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_product.created_by = ?` : ""}`
        keys = [idService_product];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product encontrad@' });
    });
};

Service_product.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idservice_product) AS count FROM service_product`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_product contabilizad@' });
    });
};

Service_product.exist = (idService_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM service_product WHERE idservice_product = ?) AS exist`;
    keys = [idService_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_product verificad@' });
    });
};

Service_product.insert = (Service_product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO service_product SET ?`;
    keys = [Service_product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Service_product cread@' });
    });
};

Service_product.update = (Service_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_product SET ? WHERE idservice_product = ? AND created_by = ?`;
        keys = [Service_product, Service_product.idservice_product, created_by];
    } else {
        query = `UPDATE service_product SET ? WHERE idservice_product = ?`;
        keys = [Service_product, Service_product.idservice_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product actualizad@' });
    });
};

Service_product.remove = (idservice_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM service_product WHERE idservice_product = ? AND created_by = ?`;
        keys = [idservice_product, created_by];
    } else {
        query = `DELETE FROM service_product WHERE idservice_product = ?`;
        keys = [idservice_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product eliminad@' });
    });
};

Service_product.logicRemove = (idservice_product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_product SET is_deleted = 1 WHERE idservice_product = ? AND created_by = ?`;
        keys = [idservice_product, created_by];
    } else {
        query = `UPDATE service_product SET is_deleted = 1 WHERE idservice_product = ?`;
        keys = [idservice_product];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_product eliminad@' });
    });
};

Service_product.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Service_product;
