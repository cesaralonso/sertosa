const Project = {};

Project.findByIdCompanyunits = (idCompanyunits, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project.*, _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits , CONCAT(_vehicle_idvehicle.model, ' ',  _vehicle_idvehicle.type, ' ',  _vehicle_idvehicle.year) as vehicle_vehicle_idvehicle 
             FROM project 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = project.companyunits_idcompanyunits INNER JOIN vehicle as _vehicle_idvehicle ON _vehicle_idvehicle.idvehicle = project.vehicle_idvehicle 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project.created_by ` : ""} 
             WHERE project.is_deleted = false 
                  AND project.companyunits_idcompanyunits = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project.created_by = ?` : ""}`
        keys = [idCompanyunits];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project encontrad@' });
    });
};

Project.findByIdVehicle = (idVehicle, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project.*, _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits , CONCAT(_vehicle_idvehicle.model, ' ',  _vehicle_idvehicle.type, ' ',  _vehicle_idvehicle.year) as vehicle_vehicle_idvehicle 
             FROM project 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = project.companyunits_idcompanyunits INNER JOIN vehicle as _vehicle_idvehicle ON _vehicle_idvehicle.idvehicle = project.vehicle_idvehicle 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project.created_by ` : ""} 
             WHERE project.is_deleted = false 
                  AND project.vehicle_idvehicle = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project.created_by = ?` : ""}`
        keys = [idVehicle];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project encontrad@' });
    });
};

Project.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project.*, _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits , CONCAT(_vehicle_idvehicle.model, ' ',  _vehicle_idvehicle.type, ' ',  _vehicle_idvehicle.year) as vehicle_vehicle_idvehicle 
             FROM project 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = project.companyunits_idcompanyunits INNER JOIN vehicle as _vehicle_idvehicle ON _vehicle_idvehicle.idvehicle = project.vehicle_idvehicle 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project.created_by ` : ""} 
             WHERE project.is_deleted = false 
                  AND project.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project leíd@' });
    });
};

Project.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project.*, _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits , CONCAT(_vehicle_idvehicle.model, ' ',  _vehicle_idvehicle.type, ' ',  _vehicle_idvehicle.year) as vehicle_vehicle_idvehicle 
             FROM project 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = project.companyunits_idcompanyunits INNER JOIN vehicle as _vehicle_idvehicle ON _vehicle_idvehicle.idvehicle = project.vehicle_idvehicle 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project.created_by ` : ""} 
             WHERE project.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project leíd@' });
    });
};

Project.findById = (idProject, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT project.*, _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits , CONCAT(_vehicle_idvehicle.model, ' ',  _vehicle_idvehicle.type, ' ',  _vehicle_idvehicle.year) as vehicle_vehicle_idvehicle 
             FROM project 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = project.companyunits_idcompanyunits INNER JOIN vehicle as _vehicle_idvehicle ON _vehicle_idvehicle.idvehicle = project.vehicle_idvehicle 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = project.created_by ` : ""} 
             WHERE project.is_deleted = false 
                  AND idproject = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND project.created_by = ?` : ""}`
        keys = [idProject];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project encontrad@' });
    });
};

Project.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idproject) AS count FROM project`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Project contabilizad@' });
    });
};

Project.exist = (idProject, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM project WHERE idproject = ?) AS exist`;
    keys = [idProject];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Project verificad@' });
    });
};

Project.insert = (Project, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO project SET ?`;
    keys = [Project];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Project cread@' });
    });
};

Project.update = (Project, created_by, connection, next) => {
    console.log('Project', Project);
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE project SET ? WHERE idproject = ? AND created_by = ?`;
        keys = [Project, Project.idproject, created_by];
    } else {
        query = `UPDATE project SET ? WHERE idproject = ?`;
        keys = [Project, Project.idproject];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project actualizad@' });
    });
};

Project.remove = (idproject, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM project WHERE idproject = ? AND created_by = ?`;
        keys = [idproject, created_by];
    } else {
        query = `DELETE FROM project WHERE idproject = ?`;
        keys = [idproject];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project eliminad@' });
    });
};

Project.logicRemove = (idproject, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE project SET is_deleted = 1 WHERE idproject = ? AND created_by = ?`;
        keys = [idproject, created_by];
    } else {
        query = `UPDATE project SET is_deleted = 1 WHERE idproject = ?`;
        keys = [idproject];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Project eliminad@' });
    });
};

Project.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Project;
