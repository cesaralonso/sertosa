const Company = {};

Company.findByIdCompanygroup = (idCompanygroup, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT company.*, _companygroup_idcompanygroup.name as companygroup_companygroup_idcompanygroup 
             FROM company 
             INNER JOIN companygroup as _companygroup_idcompanygroup ON _companygroup_idcompanygroup.idcompanygroup = company.companygroup_idcompanygroup 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = company.created_by ` : ""} 
             WHERE company.is_deleted = false 
                  AND company.companygroup_idcompanygroup = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND company.created_by = ?` : ""}`
        keys = [idCompanygroup];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company encontrad@' });
    });
};

Company.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT company.*, _companygroup_idcompanygroup.name as companygroup_companygroup_idcompanygroup 
             FROM company 
             INNER JOIN companygroup as _companygroup_idcompanygroup ON _companygroup_idcompanygroup.idcompanygroup = company.companygroup_idcompanygroup 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = company.created_by ` : ""} 
             WHERE company.is_deleted = false 
                  AND company.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND company.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company leíd@' });
    });
};

Company.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT company.*, _companygroup_idcompanygroup.name as companygroup_companygroup_idcompanygroup 
             FROM company 
             INNER JOIN companygroup as _companygroup_idcompanygroup ON _companygroup_idcompanygroup.idcompanygroup = company.companygroup_idcompanygroup 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = company.created_by ` : ""} 
             WHERE company.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND company.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company leíd@' });
    });
};

Company.findById = (idCompany, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT company.*, _companygroup_idcompanygroup.name as companygroup_companygroup_idcompanygroup 
             FROM company 
             INNER JOIN companygroup as _companygroup_idcompanygroup ON _companygroup_idcompanygroup.idcompanygroup = company.companygroup_idcompanygroup 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = company.created_by ` : ""} 
             WHERE company.is_deleted = false 
                  AND idcompany = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND company.created_by = ?` : ""}`
        keys = [idCompany];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company encontrad@' });
    });
};

Company.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idcompany) AS count FROM company`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Company contabilizad@' });
    });
};

Company.exist = (idCompany, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM company WHERE idcompany = ?) AS exist`;
    keys = [idCompany];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Company verificad@' });
    });
};

Company.insert = (Company, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO company SET ?`;
    keys = [Company];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Company cread@' });
    });
};

Company.update = (Company, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE company SET ? WHERE idcompany = ? AND created_by = ?`;
        keys = [Company, Company.idcompany, created_by];
    } else {
        query = `UPDATE company SET ? WHERE idcompany = ?`;
        keys = [Company, Company.idcompany];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company actualizad@' });
    });
};

Company.remove = (idcompany, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM company WHERE idcompany = ? AND created_by = ?`;
        keys = [idcompany, created_by];
    } else {
        query = `DELETE FROM company WHERE idcompany = ?`;
        keys = [idcompany];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company eliminad@' });
    });
};

Company.logicRemove = (idcompany, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE company SET is_deleted = 1 WHERE idcompany = ? AND created_by = ?`;
        keys = [idcompany, created_by];
    } else {
        query = `UPDATE company SET is_deleted = 1 WHERE idcompany = ?`;
        keys = [idcompany];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Company eliminad@' });
    });
};

Company.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Company;
