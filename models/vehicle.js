const Vehicle = {};

Vehicle.findByIdProject= (idProject, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT vehicle.*, _company_idcompany.name as company_company_idcompany 
             FROM vehicle 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = vehicle.company_idcompany 
             INNER JOIN project as _project_idproject ON _project_idproject.vehicle_idvehicle = vehicle.idvehicle
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = vehicle.created_by ` : ""} 
             WHERE vehicle.is_deleted = false 
                  AND _project_idproject.idproject = ?
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND vehicle.created_by = ?` : ""}`
        keys = [idProject];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle encontrad@' });
    });
};
Vehicle.findByIdCompany = (idCompany, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT vehicle.*, _company_idcompany.name as company_company_idcompany 
             FROM vehicle 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = vehicle.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = vehicle.created_by ` : ""} 
             WHERE vehicle.is_deleted = false 
                  AND vehicle.company_idcompany = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND vehicle.created_by = ?` : ""}`
        keys = [idCompany];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle encontrad@' });
    });
};

Vehicle.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT vehicle.*, _company_idcompany.name as company_company_idcompany 
             FROM vehicle 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = vehicle.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = vehicle.created_by ` : ""} 
             WHERE vehicle.is_deleted = false 
                  AND vehicle.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND vehicle.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle leíd@' });
    });
};

Vehicle.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT 
    
    LPAD(vehicle.idvehicle,4,'0') AS ID, 
    (SELECT COUNT(*) as count FROM project WHERE project.vehicle_idvehicle = vehicle.idvehicle) as countReparaciones,
    
    vehicle.*, _company_idcompany.name as company_company_idcompany 
             FROM vehicle 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = vehicle.company_idcompany

             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = vehicle.created_by ` : ""} 
             WHERE vehicle.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND vehicle.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle leíd@' });
    });
};

Vehicle.findById = (idVehicle, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT vehicle.*, _company_idcompany.name as company_company_idcompany 
             FROM vehicle 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = vehicle.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = vehicle.created_by ` : ""} 
             WHERE vehicle.is_deleted = false 
                  AND idvehicle = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND vehicle.created_by = ?` : ""}`
        keys = [idVehicle];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle encontrad@' });
    });
};

Vehicle.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idvehicle) AS count FROM vehicle`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle contabilizad@' });
    });
};

Vehicle.exist = (idVehicle, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM vehicle WHERE idvehicle = ?) AS exist`;
    keys = [idVehicle];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle verificad@' });
    });
};

Vehicle.insert = (Vehicle, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO vehicle SET ?`;
    keys = [Vehicle];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle cread@' });
    });
};

Vehicle.update = (Vehicle, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE vehicle SET ? WHERE idvehicle = ? AND created_by = ?`;
        keys = [Vehicle, Vehicle.idvehicle, created_by];
    } else {
        query = `UPDATE vehicle SET ? WHERE idvehicle = ?`;
        keys = [Vehicle, Vehicle.idvehicle];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle actualizad@' });
    });
};

Vehicle.remove = (idvehicle, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM vehicle WHERE idvehicle = ? AND created_by = ?`;
        keys = [idvehicle, created_by];
    } else {
        query = `DELETE FROM vehicle WHERE idvehicle = ?`;
        keys = [idvehicle];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle eliminad@' });
    });
};

Vehicle.logicRemove = (idvehicle, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE vehicle SET is_deleted = 1 WHERE idvehicle = ? AND created_by = ?`;
        keys = [idvehicle, created_by];
    } else {
        query = `UPDATE vehicle SET is_deleted = 1 WHERE idvehicle = ?`;
        keys = [idvehicle];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehicle eliminad@' });
    });
};

Vehicle.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehicle;
