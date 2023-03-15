const Service_employee = {};

Service_employee.findByIdProject_service = (idProject_service, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*, _employee_idemployee.name as employee_employee_idemployee , _campaign.name as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN campaign as _campaign ON _campaign.idcampaign = _project_service_idproject_service.campaign_idcampaign 
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.project_service_idproject_service = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idProject_service];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee encontrad@' });
    });
};

Service_employee.findByIdEmployee = (idEmployee, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*, _employee_idemployee.name as employee_employee_idemployee , _campaign.name as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN campaign as _campaign ON _campaign.idcampaign = _project_service_idproject_service.campaign_idcampaign 
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.employee_idemployee = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idEmployee];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee encontrad@' });
    });
};

Service_employee.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*, _employee_idemployee.name as employee_employee_idemployee , _campaign.name as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN campaign as _campaign ON _campaign.idcampaign = _project_service_idproject_service.campaign_idcampaign 
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee leíd@' });
    });
};

Service_employee.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*, _employee_idemployee.name as employee_employee_idemployee , _campaign.name as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN campaign as _campaign ON _campaign.idcampaign = _project_service_idproject_service.campaign_idcampaign 
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee leíd@' });
    });
};

Service_employee.findById = (idService_employee, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*, _employee_idemployee.name as employee_employee_idemployee , _campaign.name as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN campaign as _campaign ON _campaign.idcampaign = _project_service_idproject_service.campaign_idcampaign 
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND idservice_employee = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idService_employee];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee encontrad@' });
    });
};

Service_employee.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idservice_employee) AS count FROM service_employee`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee contabilizad@' });
    });
};

Service_employee.exist = (idService_employee, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM service_employee WHERE idservice_employee = ?) AS exist`;
    keys = [idService_employee];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee verificad@' });
    });
};

Service_employee.insert = (Service_employee, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO service_employee SET ?`;
    keys = [Service_employee];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee cread@' });
    });
};

Service_employee.update = (Service_employee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_employee SET ? WHERE idservice_employee = ? AND created_by = ?`;
        keys = [Service_employee, Service_employee.idservice_employee, created_by];
    } else {
        query = `UPDATE service_employee SET ? WHERE idservice_employee = ?`;
        keys = [Service_employee, Service_employee.idservice_employee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee actualizad@' });
    });
};

Service_employee.remove = (idservice_employee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM service_employee WHERE idservice_employee = ? AND created_by = ?`;
        keys = [idservice_employee, created_by];
    } else {
        query = `DELETE FROM service_employee WHERE idservice_employee = ?`;
        keys = [idservice_employee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee eliminad@' });
    });
};

Service_employee.logicRemove = (idservice_employee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_employee SET is_deleted = 1 WHERE idservice_employee = ? AND created_by = ?`;
        keys = [idservice_employee, created_by];
    } else {
        query = `UPDATE service_employee SET is_deleted = 1 WHERE idservice_employee = ?`;
        keys = [idservice_employee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employee eliminad@' });
    });
};

Service_employee.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Service_employee;
