const Service = {};

Service.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  AND service.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service leíd@' });
    });
};

Service.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service leíd@' });
    });
};

Service.findById = (idService, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service.* 
             FROM service 
              
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service.created_by ` : ""} 
             WHERE service.is_deleted = false 
                  AND idservice = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service.created_by = ?` : ""}`
        keys = [idService];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service encontrad@' });
    });
};

Service.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idservice) AS count FROM service`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service contabilizad@' });
    });
};

Service.exist = (idService, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM service WHERE idservice = ?) AS exist`;
    keys = [idService];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service verificad@' });
    });
};

Service.insert = (Service, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO service SET ?`;
    keys = [Service];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Service cread@' });
    });
};

Service.update = (Service, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service SET ? WHERE idservice = ? AND created_by = ?`;
        keys = [Service, Service.idservice, created_by];
    } else {
        query = `UPDATE service SET ? WHERE idservice = ?`;
        keys = [Service, Service.idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service actualizad@' });
    });
};

Service.remove = (idservice, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM service WHERE idservice = ? AND created_by = ?`;
        keys = [idservice, created_by];
    } else {
        query = `DELETE FROM service WHERE idservice = ?`;
        keys = [idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service eliminad@' });
    });
};

Service.logicRemove = (idservice, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service SET is_deleted = 1 WHERE idservice = ? AND created_by = ?`;
        keys = [idservice, created_by];
    } else {
        query = `UPDATE service SET is_deleted = 1 WHERE idservice = ?`;
        keys = [idservice];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service eliminad@' });
    });
};

Service.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Service;
