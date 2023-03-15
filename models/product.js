const Product = {};

Product.findByIdFamily = (idFamily, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT product.*, _provider_idprovider.name as provider_provider_idprovider , _family_idfamily.name as family_family_idfamily 
             FROM product 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = product.provider_idprovider INNER JOIN family as _family_idfamily ON _family_idfamily.idfamily = product.family_idfamily 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = product.created_by ` : ""} 
             WHERE product.is_deleted = false 
                  AND product.family_idfamily = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND product.created_by = ?` : ""}`
        keys = [idFamily];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product encontrad@' });
    });
};

Product.findByIdProvider = (idProvider, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT product.*, _provider_idprovider.name as provider_provider_idprovider , _family_idfamily.name as family_family_idfamily 
             FROM product 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = product.provider_idprovider INNER JOIN family as _family_idfamily ON _family_idfamily.idfamily = product.family_idfamily 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = product.created_by ` : ""} 
             WHERE product.is_deleted = false 
                  AND product.provider_idprovider = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND product.created_by = ?` : ""}`
        keys = [idProvider];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product encontrad@' });
    });
};

Product.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT product.*, _provider_idprovider.name as provider_provider_idprovider , _family_idfamily.name as family_family_idfamily 
             FROM product 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = product.provider_idprovider INNER JOIN family as _family_idfamily ON _family_idfamily.idfamily = product.family_idfamily 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = product.created_by ` : ""} 
             WHERE product.is_deleted = false 
                  AND product.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND product.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product leíd@' });
    });
};

Product.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT product.*, _provider_idprovider.name as provider_provider_idprovider , _family_idfamily.name as family_family_idfamily 
             FROM product 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = product.provider_idprovider INNER JOIN family as _family_idfamily ON _family_idfamily.idfamily = product.family_idfamily 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = product.created_by ` : ""} 
             WHERE product.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND product.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product leíd@' });
    });
};

Product.findById = (idProduct, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT product.*, _provider_idprovider.name as provider_provider_idprovider , _family_idfamily.name as family_family_idfamily 
             FROM product 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = product.provider_idprovider INNER JOIN family as _family_idfamily ON _family_idfamily.idfamily = product.family_idfamily 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = product.created_by ` : ""} 
             WHERE product.is_deleted = false 
                  AND idproduct = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND product.created_by = ?` : ""}`
        keys = [idProduct];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product encontrad@' });
    });
};

Product.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idproduct) AS count FROM product`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Product contabilizad@' });
    });
};

Product.exist = (idProduct, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM product WHERE idproduct = ?) AS exist`;
    keys = [idProduct];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Product verificad@' });
    });
};

Product.insert = (Product, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO product SET ?`;
    keys = [Product];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Product cread@' });
    });
};

Product.update = (Product, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE product SET ? WHERE idproduct = ? AND created_by = ?`;
        keys = [Product, Product.idproduct, created_by];
    } else {
        query = `UPDATE product SET ? WHERE idproduct = ?`;
        keys = [Product, Product.idproduct];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product actualizad@' });
    });
};

Product.remove = (idproduct, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM product WHERE idproduct = ? AND created_by = ?`;
        keys = [idproduct, created_by];
    } else {
        query = `DELETE FROM product WHERE idproduct = ?`;
        keys = [idproduct];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product eliminad@' });
    });
};

Product.logicRemove = (idproduct, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE product SET is_deleted = 1 WHERE idproduct = ? AND created_by = ?`;
        keys = [idproduct, created_by];
    } else {
        query = `UPDATE product SET is_deleted = 1 WHERE idproduct = ?`;
        keys = [idproduct];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Product eliminad@' });
    });
};

Product.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Product;
