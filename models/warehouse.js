const Warehouse = {};

Warehouse.findByIdCompany = (idCompany, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT warehouse.*, _company_idcompany.name as company_company_idcompany 
             FROM warehouse 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = warehouse.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = warehouse.created_by ` : ""} 
             WHERE warehouse.is_deleted = false 
                  AND warehouse.company_idcompany = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND warehouse.created_by = ?` : ""}`
        keys = [idCompany];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse encontrad@' });
    });
};

Warehouse.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT warehouse.*, _company_idcompany.name as company_company_idcompany 
             FROM warehouse 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = warehouse.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = warehouse.created_by ` : ""} 
             WHERE warehouse.is_deleted = false 
                  AND warehouse.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND warehouse.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse leíd@' });
    });
};

Warehouse.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT warehouse.*, _company_idcompany.name as company_company_idcompany 
             FROM warehouse 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = warehouse.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = warehouse.created_by ` : ""} 
             WHERE warehouse.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND warehouse.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse leíd@' });
    });
};

Warehouse.findById = (idWarehouse, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT warehouse.*, _company_idcompany.name as company_company_idcompany 
             FROM warehouse 
             INNER JOIN company as _company_idcompany ON _company_idcompany.idcompany = warehouse.company_idcompany 
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = warehouse.created_by ` : ""} 
             WHERE warehouse.is_deleted = false 
                  AND idwarehouse = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND warehouse.created_by = ?` : ""}`
        keys = [idWarehouse];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse encontrad@' });
    });
};

Warehouse.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idwarehouse) AS count FROM warehouse`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse contabilizad@' });
    });
};

Warehouse.exist = (idWarehouse, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM warehouse WHERE idwarehouse = ?) AS exist`;
    keys = [idWarehouse];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse verificad@' });
    });
};

Warehouse.insert = (Warehouse, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO warehouse SET ?`;
    keys = [Warehouse];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse cread@' });
    });
};

Warehouse.update = (Warehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE warehouse SET ? WHERE idwarehouse = ? AND created_by = ?`;
        keys = [Warehouse, Warehouse.idwarehouse, created_by];
    } else {
        query = `UPDATE warehouse SET ? WHERE idwarehouse = ?`;
        keys = [Warehouse, Warehouse.idwarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse actualizad@' });
    });
};

Warehouse.remove = (idwarehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM warehouse WHERE idwarehouse = ? AND created_by = ?`;
        keys = [idwarehouse, created_by];
    } else {
        query = `DELETE FROM warehouse WHERE idwarehouse = ?`;
        keys = [idwarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse eliminad@' });
    });
};

Warehouse.logicRemove = (idwarehouse, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE warehouse SET is_deleted = 1 WHERE idwarehouse = ? AND created_by = ?`;
        keys = [idwarehouse, created_by];
    } else {
        query = `UPDATE warehouse SET is_deleted = 1 WHERE idwarehouse = ?`;
        keys = [idwarehouse];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Warehouse eliminad@' });
    });
};

Warehouse.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Warehouse;
