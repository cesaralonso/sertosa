const Validation = {};

Validation.findByIdService_employee = (idService_employee, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT validation.*, _service_employee_idservice_employee.name as service_employee_service_employee_idservice_employee , _service_idservice.name as service_service_idservice 
             FROM validation 
             INNER JOIN service_employee as _service_employee_idservice_employee ON _service_employee_idservice_employee.idservice_employee = validation.service_employee_idservice_employee INNER JOIN service as _service_idservice ON _service_idservice.idservice = validation.service_idservice 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = validation.created_by ` : ""} 
             WHERE validation.is_deleted = false 
                  AND validation.service_employee_idservice_employee = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND validation.created_by = ?` : ""}`
        keys = [idService_employee];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation encontrad@' });
    });
};

Validation.findByIdService = (idService, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT validation.*, _service_employee_idservice_employee.name as service_employee_service_employee_idservice_employee , _service_idservice.name as service_service_idservice 
             FROM validation 
             INNER JOIN service_employee as _service_employee_idservice_employee ON _service_employee_idservice_employee.idservice_employee = validation.service_employee_idservice_employee INNER JOIN service as _service_idservice ON _service_idservice.idservice = validation.service_idservice 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = validation.created_by ` : ""} 
             WHERE validation.is_deleted = false 
                  AND validation.service_idservice = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND validation.created_by = ?` : ""}`
        keys = [idService];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation encontrad@' });
    });
};

Validation.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT validation.*, _service_employee_idservice_employee.name as service_employee_service_employee_idservice_employee , _service_idservice.name as service_service_idservice 
             FROM validation 
             INNER JOIN service_employee as _service_employee_idservice_employee ON _service_employee_idservice_employee.idservice_employee = validation.service_employee_idservice_employee INNER JOIN service as _service_idservice ON _service_idservice.idservice = validation.service_idservice 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = validation.created_by ` : ""} 
             WHERE validation.is_deleted = false 
                  AND validation.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND validation.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation leíd@' });
    });
};

Validation.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT validation.*, _service_employee_idservice_employee.name as service_employee_service_employee_idservice_employee , _service_idservice.name as service_service_idservice 
             FROM validation 
             INNER JOIN service_employee as _service_employee_idservice_employee ON _service_employee_idservice_employee.idservice_employee = validation.service_employee_idservice_employee INNER JOIN service as _service_idservice ON _service_idservice.idservice = validation.service_idservice 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = validation.created_by ` : ""} 
             WHERE validation.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND validation.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation leíd@' });
    });
};

Validation.findById = (idValidation, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT validation.*, _service_employee_idservice_employee.name as service_employee_service_employee_idservice_employee , _service_idservice.name as service_service_idservice 
             FROM validation 
             INNER JOIN service_employee as _service_employee_idservice_employee ON _service_employee_idservice_employee.idservice_employee = validation.service_employee_idservice_employee INNER JOIN service as _service_idservice ON _service_idservice.idservice = validation.service_idservice 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = validation.created_by ` : ""} 
             WHERE validation.is_deleted = false 
                  AND idvalidation = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND validation.created_by = ?` : ""}`
        keys = [idValidation];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation encontrad@' });
    });
};

Validation.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idvalidation) AS count FROM validation`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Validation contabilizad@' });
    });
};

Validation.exist = (idValidation, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM validation WHERE idvalidation = ?) AS exist`;
    keys = [idValidation];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Validation verificad@' });
    });
};

Validation.insert = (Validation, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO validation SET ?`;
    keys = [Validation];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Validation cread@' });
    });
};

Validation.update = (Validation, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE validation SET ? WHERE idvalidation = ? AND created_by = ?`;
        keys = [Validation, Validation.idvalidation, created_by];
    } else {
        query = `UPDATE validation SET ? WHERE idvalidation = ?`;
        keys = [Validation, Validation.idvalidation];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation actualizad@' });
    });
};

Validation.remove = (idvalidation, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM validation WHERE idvalidation = ? AND created_by = ?`;
        keys = [idvalidation, created_by];
    } else {
        query = `DELETE FROM validation WHERE idvalidation = ?`;
        keys = [idvalidation];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation eliminad@' });
    });
};

Validation.logicRemove = (idvalidation, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE validation SET is_deleted = 1 WHERE idvalidation = ? AND created_by = ?`;
        keys = [idvalidation, created_by];
    } else {
        query = `UPDATE validation SET is_deleted = 1 WHERE idvalidation = ?`;
        keys = [idvalidation];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Validation eliminad@' });
    });
};

Validation.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Validation;
