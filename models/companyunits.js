const Companyunits = {};

Companyunits.findByIdCompany = (idCompany, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT companyunits.*, _company_idcompany.name as company_company_idcompany 
             FROM companyunits 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = companyunits.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = companyunits.created_by ` : ""} 
             WHERE companyunits.is_deleted = false 
                  AND companyunits.company_idcompany = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND companyunits.created_by = ?` : ""}`
        keys = [idCompany];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits encontrad@' });
    });
};

Companyunits.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT companyunits.*, _company_idcompany.name as company_company_idcompany 
             FROM companyunits 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = companyunits.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = companyunits.created_by ` : ""} 
             WHERE companyunits.is_deleted = false 
                  AND companyunits.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND companyunits.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits leíd@' });
    });
};

Companyunits.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT companyunits.*, _company_idcompany.name as company_company_idcompany 
             FROM companyunits 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = companyunits.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = companyunits.created_by ` : ""} 
             WHERE companyunits.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND companyunits.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits leíd@' });
    });
};

Companyunits.findById = (idCompanyunits, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT companyunits.*, _company_idcompany.name as company_company_idcompany 
             FROM companyunits 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = companyunits.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = companyunits.created_by ` : ""} 
             WHERE companyunits.is_deleted = false 
                  AND idcompanyunits = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND companyunits.created_by = ?` : ""}`
        keys = [idCompanyunits];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits encontrad@' });
    });
};

Companyunits.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idcompanyunits) AS count FROM companyunits`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits contabilizad@' });
    });
};

Companyunits.exist = (idCompanyunits, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM companyunits WHERE idcompanyunits = ?) AS exist`;
    keys = [idCompanyunits];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits verificad@' });
    });
};

Companyunits.insert = (Companyunits, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO companyunits SET ?`;
    keys = [Companyunits];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits cread@' });
    });
};

Companyunits.update = (Companyunits, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE companyunits SET ? WHERE idcompanyunits = ? AND created_by = ?`;
        keys = [Companyunits, Companyunits.idcompanyunits, created_by];
    } else {
        query = `UPDATE companyunits SET ? WHERE idcompanyunits = ?`;
        keys = [Companyunits, Companyunits.idcompanyunits];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits actualizad@' });
    });
};

Companyunits.remove = (idcompanyunits, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM companyunits WHERE idcompanyunits = ? AND created_by = ?`;
        keys = [idcompanyunits, created_by];
    } else {
        query = `DELETE FROM companyunits WHERE idcompanyunits = ?`;
        keys = [idcompanyunits];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits eliminad@' });
    });
};

Companyunits.logicRemove = (idcompanyunits, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE companyunits SET is_deleted = 1 WHERE idcompanyunits = ? AND created_by = ?`;
        keys = [idcompanyunits, created_by];
    } else {
        query = `UPDATE companyunits SET is_deleted = 1 WHERE idcompanyunits = ?`;
        keys = [idcompanyunits];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Companyunits eliminad@' });
    });
};

Companyunits.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Companyunits;
