const Project_service = {};

Project_service.findByIdProject = (idProject, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project_service.*, _project_idproject.name as project_project_idproject , _service_idservice.name as service_service_idservice 
             FROM project_service 
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = project_service.project_idproject INNER JOIN service as _service_idservice ON _service_idservice.idservice = project_service.service_idservice 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project_service.created_by ` : ""} 
             WHERE project_service.is_deleted = false 
                  AND project_service.project_idproject = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project_service.created_by = ?` : ""}`
        keys = [idProject];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service encontrad@' });
    });
};

Project_service.findByIdService = (idService, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project_service.*, _project_idproject.name as project_project_idproject , _service_idservice.name as service_service_idservice 
             FROM project_service 
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = project_service.project_idproject INNER JOIN service as _service_idservice ON _service_idservice.idservice = project_service.service_idservice 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project_service.created_by ` : ""} 
             WHERE project_service.is_deleted = false 
                  AND project_service.service_idservice = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project_service.created_by = ?` : ""}`
        keys = [idService];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service encontrad@' });
    });
};

Project_service.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project_service.*, _project_idproject.name as project_project_idproject , _service_idservice.name as service_service_idservice 
             FROM project_service 
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = project_service.project_idproject INNER JOIN service as _service_idservice ON _service_idservice.idservice = project_service.service_idservice 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project_service.created_by ` : ""} 
             WHERE project_service.is_deleted = false 
                  AND project_service.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project_service.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service leíd@' });
    });
};

Project_service.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project_service.*, _project_idproject.name as project_project_idproject , _service_idservice.name as service_service_idservice 
             FROM project_service 
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = project_service.project_idproject INNER JOIN service as _service_idservice ON _service_idservice.idservice = project_service.service_idservice 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project_service.created_by ` : ""} 
             WHERE project_service.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project_service.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service leíd@' });
    });
};

Project_service.findById = (idProject_service, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project_service.*, _project_idproject.name as project_project_idproject , _service_idservice.name as service_service_idservice 
             FROM project_service 
             INNER JOIN project as _project_idproject ON _project_idproject.idproject = project_service.project_idproject INNER JOIN service as _service_idservice ON _service_idservice.idservice = project_service.service_idservice 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project_service.created_by ` : ""} 
             WHERE project_service.is_deleted = false 
                  AND idproject_service = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project_service.created_by = ?` : ""}`
        keys = [idProject_service];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service encontrad@' });
    });
};

Project_service.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idproject_service) AS count FROM project_service`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Project_service contabilizad@' });
    });
};

Project_service.exist = (idProject_service, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM project_service WHERE idproject_service = ?) AS exist`;
    keys = [idProject_service];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Project_service verificad@' });
    });
};

Project_service.insert = (Project_service, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO project_service SET ?`;
    keys = [Project_service];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Project_service cread@' });
    });
};

Project_service.update = (Project_service, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE project_service SET ? WHERE idproject_service = ? AND created_by = ?`;
        keys = [Project_service, Project_service.idproject_service, created_by];
    } else {
        query = `UPDATE project_service SET ? WHERE idproject_service = ?`;
        keys = [Project_service, Project_service.idproject_service];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service actualizad@' });
    });
};

Project_service.remove = (idproject_service, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM project_service WHERE idproject_service = ? AND created_by = ?`;
        keys = [idproject_service, created_by];
    } else {
        query = `DELETE FROM project_service WHERE idproject_service = ?`;
        keys = [idproject_service];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service eliminad@' });
    });
};

Project_service.logicRemove = (idproject_service, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE project_service SET is_deleted = 1 WHERE idproject_service = ? AND created_by = ?`;
        keys = [idproject_service, created_by];
    } else {
        query = `UPDATE project_service SET is_deleted = 1 WHERE idproject_service = ?`;
        keys = [idproject_service];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project_service eliminad@' });
    });
};

Project_service.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Project_service;
