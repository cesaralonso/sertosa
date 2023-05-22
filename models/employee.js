const Employee = {};

Employee.findByIdCompanyunits = (idCompanyunits, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT employee.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits 
             FROM employee 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = employee.si_user_idsi_user 
             INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = employee.companyunits_idcompanyunits 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = employee.created_by ` : ""} 
             WHERE employee.is_deleted = false 
                  AND employee.companyunits_idcompanyunits = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND employee.created_by = ?` : ""}`
        keys = [idCompanyunits];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee encontrad@' });
    });
};

Employee.findByIdSi_user = (idSi_user, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT employee.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits 
             FROM employee 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = employee.si_user_idsi_user INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = employee.companyunits_idcompanyunits 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = employee.created_by ` : ""} 
             WHERE employee.is_deleted = false 
                  AND employee.si_user_idsi_user = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND employee.created_by = ?` : ""}`
        keys = [idSi_user];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee encontrad@' });
    });
};

Employee.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT employee.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits 
             FROM employee 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = employee.si_user_idsi_user INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = employee.companyunits_idcompanyunits 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = employee.created_by ` : ""} 
             WHERE employee.is_deleted = false 
                  AND employee.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND employee.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee leíd@' });
    });
};

Employee.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT employee.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits 
             FROM employee 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = employee.si_user_idsi_user INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = employee.companyunits_idcompanyunits 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = employee.created_by ` : ""} 
             WHERE employee.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND employee.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee leíd@' });
    });
};

Employee.findById = (idEmployee, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT employee.*, _si_user_idsi_user.email as si_user_si_user_idsi_user , _companyunits_idcompanyunits.name as companyunits_companyunits_idcompanyunits 
             FROM employee 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = employee.si_user_idsi_user INNER JOIN companyunits as _companyunits_idcompanyunits ON _companyunits_idcompanyunits.idcompanyunits = employee.companyunits_idcompanyunits 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = employee.created_by ` : ""} 
             WHERE employee.is_deleted = false 
                  AND idemployee = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND employee.created_by = ?` : ""}`
        keys = [idEmployee];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee encontrad@' });
    });
};

Employee.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idemployee) AS count FROM employee`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Employee contabilizad@' });
    });
};

Employee.exist = (idEmployee, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM employee WHERE idemployee = ?) AS exist`;
    keys = [idEmployee];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Employee verificad@' });
    });
};

Employee.insert = (Employee, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO employee SET ?`;
    keys = [Employee];

    connection.query(query, keys, (error, result) => {
        if ( error ) {
            // WARNING: To take effect, user table must have the email field as unique column
            if (error.code === 'ER_DUP_ENTRY') {
                return next( null, {
                    success: false,
                    error: error,
                    message: 'Este código ya esta en uso'
                });
            } else
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        } else
            return next(null, { success: true, result: result, message: 'Employee cread@' });
    });
};

Employee.update = (Employee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE employee SET ? WHERE idemployee = ? AND created_by = ?`;
        keys = [Employee, Employee.idemployee, created_by];
    } else {
        query = `UPDATE employee SET ? WHERE idemployee = ?`;
        keys = [Employee, Employee.idemployee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee actualizad@' });
    });
};

Employee.remove = (idemployee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM employee WHERE idemployee = ? AND created_by = ?`;
        keys = [idemployee, created_by];
    } else {
        query = `DELETE FROM employee WHERE idemployee = ?`;
        keys = [idemployee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee eliminad@' });
    });
};

Employee.logicRemove = (idemployee, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE employee SET is_deleted = 1 WHERE idemployee = ? AND created_by = ?`;
        keys = [idemployee, created_by];
    } else {
        query = `UPDATE employee SET is_deleted = 1 WHERE idemployee = ?`;
        keys = [idemployee];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Employee eliminad@' });
    });
};

Employee.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Employee;
