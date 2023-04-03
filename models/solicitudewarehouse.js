const Solicitudewarehouse = {};

Solicitudewarehouse.findByIdProject_service = (idProject_service, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse.*, CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project_idproject.name, ' - ', _service_idservice.name) as project_service_project_service_idproject_service , _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse 
             FROM solicitudewarehouse 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudewarehouse.project_service_idproject_service INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = solicitudewarehouse.warehouse_idwarehouse
             
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = _project_service_idproject_service.service_idservice 
             
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse.created_by ` : ""} 
             WHERE solicitudewarehouse.is_deleted = false 
                  AND solicitudewarehouse.project_service_idproject_service = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse.created_by = ?` : ""}`
        keys = [idProject_service];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse encontrad@' });
    });
};

Solicitudewarehouse.findByIdWarehouse = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse.*, CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project_idproject.name, ' - ', _service_idservice.name) as project_service_project_service_idproject_service , _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse 
             FROM solicitudewarehouse 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudewarehouse.project_service_idproject_service INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = solicitudewarehouse.warehouse_idwarehouse
             
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = _project_service_idproject_service.service_idservice 
             
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse.created_by ` : ""} 
             WHERE solicitudewarehouse.is_deleted = false 
                  AND solicitudewarehouse.warehouse_idwarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse.created_by = ?` : ""}`
        keys = [idWarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse encontrad@' });
    });
};

Solicitudewarehouse.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse.*, CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project_idproject.name, ' - ', _service_idservice.name) as project_service_project_service_idproject_service , _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse 
             FROM solicitudewarehouse 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudewarehouse.project_service_idproject_service INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = solicitudewarehouse.warehouse_idwarehouse
             
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = _project_service_idproject_service.service_idservice 
                           INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject              INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject  
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse.created_by ` : ""} 
             WHERE solicitudewarehouse.is_deleted = false 
                  AND solicitudewarehouse.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse leíd@' });
    });
};

Solicitudewarehouse.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse.*, CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project_idproject.name, ' - ', _service_idservice.name) as project_service_project_service_idproject_service , _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse 
             FROM solicitudewarehouse 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudewarehouse.project_service_idproject_service INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = solicitudewarehouse.warehouse_idwarehouse
             
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = _project_service_idproject_service.service_idservice 


             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse.created_by ` : ""} 
             WHERE solicitudewarehouse.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse leíd@' });
    });
};

Solicitudewarehouse.findById = (idSolicitudewarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT solicitudewarehouse.*, CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project_idproject.name, ' - ', _service_idservice.name) as project_service_project_service_idproject_service , _warehouse_idwarehouse.name as warehouse_warehouse_idwarehouse 
             FROM solicitudewarehouse 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = solicitudewarehouse.project_service_idproject_service INNER JOIN warehouse as _warehouse_idwarehouse ON _warehouse_idwarehouse.idwarehouse = solicitudewarehouse.warehouse_idwarehouse
             
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service_idservice ON _service_idservice.idservice = _project_service_idproject_service.service_idservice 
                                                                 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = solicitudewarehouse.created_by ` : ""} 
             WHERE solicitudewarehouse.is_deleted = false 
                  AND idsolicitudewarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND solicitudewarehouse.created_by = ?` : ""}`
        keys = [idSolicitudewarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse encontrad@' });
    });
};

Solicitudewarehouse.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsolicitudewarehouse) AS count FROM solicitudewarehouse`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse contabilizad@' });
    });
};

Solicitudewarehouse.exist = (idSolicitudewarehouse, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM solicitudewarehouse WHERE idsolicitudewarehouse = ?) AS exist`;
    keys = [idSolicitudewarehouse];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse verificad@' });
    });
};

Solicitudewarehouse.insert = (Solicitudewarehouse, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO solicitudewarehouse SET ?`;
    keys = [Solicitudewarehouse];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse cread@' });
    });
};

Solicitudewarehouse.update = (Solicitudewarehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudewarehouse SET ? WHERE idsolicitudewarehouse = ? AND created_by = ?`;
        keys = [Solicitudewarehouse, Solicitudewarehouse.idsolicitudewarehouse, created_by];
    } else {
        query = `UPDATE solicitudewarehouse SET ? WHERE idsolicitudewarehouse = ?`;
        keys = [Solicitudewarehouse, Solicitudewarehouse.idsolicitudewarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse actualizad@' });
    });
};

Solicitudewarehouse.remove = (idsolicitudewarehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM solicitudewarehouse WHERE idsolicitudewarehouse = ? AND created_by = ?`;
        keys = [idsolicitudewarehouse, created_by];
    } else {
        query = `DELETE FROM solicitudewarehouse WHERE idsolicitudewarehouse = ?`;
        keys = [idsolicitudewarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse eliminad@' });
    });
};

Solicitudewarehouse.logicRemove = (idsolicitudewarehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE solicitudewarehouse SET is_deleted = 1 WHERE idsolicitudewarehouse = ? AND created_by = ?`;
        keys = [idsolicitudewarehouse, created_by];
    } else {
        query = `UPDATE solicitudewarehouse SET is_deleted = 1 WHERE idsolicitudewarehouse = ?`;
        keys = [idsolicitudewarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Solicitudewarehouse eliminad@' });
    });
};

Solicitudewarehouse.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Solicitudewarehouse;
