const Service_employee = {};

Service_employee.findEstadosByIdServiceemployee = (idServiceemployee, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employeeestado.*, se.*
    
             FROM service_employeeestado 
             INNER JOIN service_employee as se ON se.idservice_employee = service_employeeestado.service_employee_idservice_employee 

              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employeeestado.is_deleted = false 
                  AND service_employeeestado.service_employee_idservice_employee = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employeeestado.created_by = ?` : ""}`
        keys = [idServiceemployee];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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


Service_employee.findByIdProject_service = (idProject_service, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employee.*,
    (SELECT TIMESTAMPDIFF(DAY, service_employee.created_at, NOW()) AS dias_transcurridos) as dias_transcurridos, _employee_idemployee.name as employee_employee_idemployee , CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project.name, ' - ', _service.name) as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN project as _project ON _project.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service ON _service.idservice = _project_service_idproject_service.service_idservice 
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.project_service_idproject_service = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idProject_service];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT service_employee.*,
    (SELECT TIMESTAMPDIFF(DAY, service_employee.created_at, NOW()) AS dias_transcurridos) as dias_transcurridos, _employee_idemployee.name as employee_employee_idemployee , CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project.name, ' - ', _service.name) as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN project as _project ON _project.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service ON _service.idservice = _project_service_idproject_service.service_idservice 
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.employee_idemployee = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idEmployee];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT service_employee.*,
    (SELECT TIMESTAMPDIFF(DAY, service_employee.created_at, NOW()) AS dias_transcurridos) as dias_transcurridos, _employee_idemployee.name as employee_employee_idemployee , CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project.name, ' - ', _service.name) as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN project as _project ON _project.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service ON _service.idservice = _project_service_idproject_service.service_idservice 
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND service_employee.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT service_employee.*,
    (SELECT TIMESTAMPDIFF(DAY, service_employee.created_at, NOW()) AS dias_transcurridos) as dias_transcurridos,
    _employee_idemployee.name as employee_employee_idemployee , CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project.name, ' - ', _service.name, ' > ', _employee_idemployee.name) as project_service_project_service_idproject_service 
    FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN project as _project ON _project.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service ON _service.idservice = _project_service_idproject_service.service_idservice 
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
    query = `SELECT service_employee.*,
    (SELECT TIMESTAMPDIFF(DAY, service_employee.created_at, NOW()) AS dias_transcurridos) as dias_transcurridos, _employee_idemployee.name as employee_employee_idemployee , CONCAT(_project_service_idproject_service.idproject_service, ' - ', _project.name, ' - ', _service.name) as project_service_project_service_idproject_service 
             FROM service_employee 
             INNER JOIN employee as _employee_idemployee ON _employee_idemployee.idemployee = service_employee.employee_idemployee 
             INNER JOIN project_service as _project_service_idproject_service ON _project_service_idproject_service.idproject_service = service_employee.project_service_idproject_service 
             INNER JOIN project as _project ON _project.idproject = _project_service_idproject_service.project_idproject 
             INNER JOIN service as _service ON _service.idservice = _project_service_idproject_service.service_idservice 
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employee.created_by ` : ""} 
             WHERE service_employee.is_deleted = false 
                  AND idservice_employee = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employee.created_by = ?` : ""}`
        keys = [idService_employee];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
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
        else { 
            return next(null, { success: true, result: result, message: 'Service_employee modificado' });
        }
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
