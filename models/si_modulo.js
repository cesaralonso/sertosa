const Si_modulo = {};

Si_modulo.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_modulo.* 
             FROM si_modulo 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_modulo.created_by ` : ""} 
             WHERE si_modulo.is_deleted = false 
                  AND si_modulo.created_at BETWEEN ? AND ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_modulo.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo leíd@' });
    });
};

Si_modulo.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_modulo.* 
             FROM si_modulo 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_modulo.created_by ` : ""} 
             WHERE si_modulo.is_deleted = false 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_modulo.created_by = ?` : ""}`
        keys = [];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

        console.log('query', query);
        console.log('keys', keys);

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo leíd@' });
    });
};

Si_modulo.findById = (idSi_modulo, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_modulo.* 
             FROM si_modulo 
              
              
              
             ${user.companyunits_idcompanyunits ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_modulo.created_by ` : ""} 
             WHERE si_modulo.is_deleted = false 
                  AND idsi_modulo = ? 
                  ${user.companyunits_idcompanyunits ? `AND _si_user.companyunits_idcompanyunits = ? ` : ""}
                  ${only_own ? `AND si_modulo.created_by = ?` : ""}`
        keys = [idSi_modulo];
        user.companyunits_idcompanyunits ? keys.push(user.companyunits_idcompanyunits) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo encontrad@' });
    });
};

Si_modulo.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_modulo) AS count FROM si_modulo`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo contabilizad@' });
    });
};

Si_modulo.exist = (idSi_modulo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_modulo WHERE idsi_modulo = ?) AS exist`;
    keys = [idSi_modulo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo verificad@' });
    });
};

Si_modulo.insert = (Si_modulo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_modulo SET ?`;
    keys = [Si_modulo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo cread@' });
    });
};

Si_modulo.update = (Si_modulo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_modulo SET ? WHERE idsi_modulo = ? AND created_by = ?`;
        keys = [Si_modulo, Si_modulo.idsi_modulo, created_by];
    } else {
        query = `UPDATE si_modulo SET ? WHERE idsi_modulo = ?`;
        keys = [Si_modulo, Si_modulo.idsi_modulo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo actualizad@' });
    });
};

Si_modulo.remove = (idsi_modulo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_modulo WHERE idsi_modulo = ? AND created_by = ?`;
        keys = [idsi_modulo, created_by];
    } else {
        query = `DELETE FROM si_modulo WHERE idsi_modulo = ?`;
        keys = [idsi_modulo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo eliminad@' });
    });
};

Si_modulo.logicRemove = (idsi_modulo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_modulo SET is_deleted = 1 WHERE idsi_modulo = ? AND created_by = ?`;
        keys = [idsi_modulo, created_by];
    } else {
        query = `UPDATE si_modulo SET is_deleted = 1 WHERE idsi_modulo = ?`;
        keys = [idsi_modulo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_modulo eliminad@' });
    });
};

Si_modulo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_modulo;
