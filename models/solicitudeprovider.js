const Solicitudeprovider = {};

Solicitudeprovider.findByIdProject_service = (idProject_service, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider.*, _provider_idprovider.name as provider_provider_idprovider , _project_service_idproject_service.idproject_service as project_service_project_service_idproject_service 
             FROM solicitudeprovider 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = solicitudeprovider.provider_idprovider INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudeprovider.project_service_idproject_service 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider.created_by ` : ""} 
             WHERE solicitudeprovider.is_deleted = false 
                  AND solicitudeprovider.project_service_idproject_service = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider.created_by = ?` : ""}`
        keys = [idProject_service];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider encontrad@' });
    });
};

Solicitudeprovider.findByIdProvider = (idProvider, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider.*, _provider_idprovider.name as provider_provider_idprovider , _project_service_idproject_service.idproject_service as project_service_project_service_idproject_service 
             FROM solicitudeprovider 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = solicitudeprovider.provider_idprovider INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudeprovider.project_service_idproject_service 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider.created_by ` : ""} 
             WHERE solicitudeprovider.is_deleted = false 
                  AND solicitudeprovider.provider_idprovider = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider.created_by = ?` : ""}`
        keys = [idProvider];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider encontrad@' });
    });
};

Solicitudeprovider.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider.*, _provider_idprovider.name as provider_provider_idprovider , _project_service_idproject_service.idproject_service as project_service_project_service_idproject_service 
             FROM solicitudeprovider 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = solicitudeprovider.provider_idprovider INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudeprovider.project_service_idproject_service 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider.created_by ` : ""} 
             WHERE solicitudeprovider.is_deleted = false 
                  AND solicitudeprovider.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider leíd@' });
    });
};

Solicitudeprovider.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider.*, _provider_idprovider.name as provider_provider_idprovider , _project_service_idproject_service.idproject_service as project_service_project_service_idproject_service 
             FROM solicitudeprovider 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = solicitudeprovider.provider_idprovider INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudeprovider.project_service_idproject_service 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider.created_by ` : ""} 
             WHERE solicitudeprovider.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider leíd@' });
    });
};

Solicitudeprovider.findById = (idSolicitudeprovider, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudeprovider.*, _provider_idprovider.name as provider_provider_idprovider , _project_service_idproject_service.idproject_service as project_service_project_service_idproject_service 
             FROM solicitudeprovider 
             INNER JOIN provider as _provider_idprovider ON _provider_idprovider.idprovider = solicitudeprovider.provider_idprovider INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudeprovider.project_service_idproject_service 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudeprovider.created_by ` : ""} 
             WHERE solicitudeprovider.is_deleted = false 
                  AND idsolicitudeprovider = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND solicitudeprovider.created_by = ?` : ""}`
        keys = [idSolicitudeprovider];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider encontrad@' });
    });
};

Solicitudeprovider.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsolicitudeprovider) AS count FROM solicitudeprovider`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider contabilizad@' });
    });
};

Solicitudeprovider.exist = (idSolicitudeprovider, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM solicitudeprovider WHERE idsolicitudeprovider = ?) AS exist`;
    keys = [idSolicitudeprovider];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider verificad@' });
    });
};

Solicitudeprovider.insert = (Solicitudeprovider, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO solicitudeprovider SET ?`;
    keys = [Solicitudeprovider];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider cread@' });
    });
};

Solicitudeprovider.update = (Solicitudeprovider, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudeprovider SET ? WHERE idsolicitudeprovider = ? AND created_by = ?`;
        keys = [Solicitudeprovider, Solicitudeprovider.idsolicitudeprovider, created_by];
    } else {
        query = `UPDATE solicitudeprovider SET ? WHERE idsolicitudeprovider = ?`;
        keys = [Solicitudeprovider, Solicitudeprovider.idsolicitudeprovider];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider actualizad@' });
    });
};

Solicitudeprovider.remove = (idsolicitudeprovider, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM solicitudeprovider WHERE idsolicitudeprovider = ? AND created_by = ?`;
        keys = [idsolicitudeprovider, created_by];
    } else {
        query = `DELETE FROM solicitudeprovider WHERE idsolicitudeprovider = ?`;
        keys = [idsolicitudeprovider];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider eliminad@' });
    });
};

Solicitudeprovider.logicRemove = (idsolicitudeprovider, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudeprovider SET is_deleted = 1 WHERE idsolicitudeprovider = ? AND created_by = ?`;
        keys = [idsolicitudeprovider, created_by];
    } else {
        query = `UPDATE solicitudeprovider SET is_deleted = 1 WHERE idsolicitudeprovider = ?`;
        keys = [idsolicitudeprovider];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudeprovider eliminad@' });
    });
};

Solicitudeprovider.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Solicitudeprovider;
