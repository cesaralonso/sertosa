const Service_employeeestado = {};


Service_employeeestado.findByIdServiceemployee = (idServiceemployee, user, only_own, connection, next) => {
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
            return next(null, { success: true, result: result, message: 'Service_employeeestado encontrad@' });
    });
};

Service_employeeestado.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT service_employeeestado.*
        FROM service_employeeestado 

             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = service_employeeestado.created_by ` : ""} 
             WHERE service_employeeestado.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND service_employeeestado.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado leíd@' });
    });
};

Service_employeeestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idservice_employeeestado) AS count FROM service_employeeestado`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado contabilizad@' });
    });
};

Service_employeeestado.exist = (idService_employeeestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM service_employeeestado WHERE idservice_employeeestado = ?) AS exist`;
    keys = [idService_employeeestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado verificad@' });
    });
};

Service_employeeestado.insert = (Service_employeeestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO service_employeeestado SET ?`;
    keys = [Service_employeeestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado cread@' });
    });
};

Service_employeeestado.update = (Service_employeeestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_employeeestado SET ? WHERE idservice_employeeestado = ? AND created_by = ?`;
        keys = [Service_employeeestado, Service_employeeestado.idservice_employeeestado, created_by];
    } else {
        query = `UPDATE service_employeeestado SET ? WHERE idservice_employeeestado = ?`;
        keys = [Service_employeeestado, Service_employeeestado.idservice_employeeestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else {

            return next(null, { success: true, result: result, message: 'Service_employeeestado estado creado' });

        }
    });
};

Service_employeeestado.remove = (idservice_employeeestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM service_employeeestado WHERE idservice_employeeestado = ? AND created_by = ?`;
        keys = [idservice_employeeestado, created_by];
    } else {
        query = `DELETE FROM service_employeeestado WHERE idservice_employeeestado = ?`;
        keys = [idservice_employeeestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado eliminad@' });
    });
};

Service_employeeestado.logicRemove = (idservice_employeeestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE service_employeeestado SET is_deleted = 1 WHERE idservice_employeeestado = ? AND created_by = ?`;
        keys = [idservice_employeeestado, created_by];
    } else {
        query = `UPDATE service_employeeestado SET is_deleted = 1 WHERE idservice_employeeestado = ?`;
        keys = [idservice_employeeestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Service_employeeestado eliminad@' });
    });
};

Service_employeeestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Service_employeeestado;
