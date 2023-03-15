const Si_sesion = {};

Si_sesion.findByIdSi_user = (idSi_user, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesion.*, _si_user_idsi_user.email as si_user_si_user_idsi_user 
             FROM si_sesion 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_sesion.si_user_idsi_user 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesion.created_by ` : ""} 
             WHERE si_sesion.is_deleted = false 
                  AND si_sesion.si_user_idsi_user = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_sesion.created_by = ?` : ""}`
        keys = [idSi_user];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion encontrad@' });
    });
};

Si_sesion.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesion.*, _si_user_idsi_user.email as si_user_si_user_idsi_user 
             FROM si_sesion 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_sesion.si_user_idsi_user 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesion.created_by ` : ""} 
             WHERE si_sesion.is_deleted = false 
                  AND si_sesion.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_sesion.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion leíd@' });
    });
};

Si_sesion.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesion.*, _si_user_idsi_user.email as si_user_si_user_idsi_user 
             FROM si_sesion 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_sesion.si_user_idsi_user 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesion.created_by ` : ""} 
             WHERE si_sesion.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_sesion.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion leíd@' });
    });
};

Si_sesion.findById = (idSi_sesion, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_sesion.*, _si_user_idsi_user.email as si_user_si_user_idsi_user 
             FROM si_sesion 
             INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = si_sesion.si_user_idsi_user 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_sesion.created_by ` : ""} 
             WHERE si_sesion.is_deleted = false 
                  AND idsi_sesion = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_sesion.created_by = ?` : ""}`
        keys = [idSi_sesion];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion encontrad@' });
    });
};

Si_sesion.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_sesion) AS count FROM si_sesion`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion contabilizad@' });
    });
};

Si_sesion.exist = (idSi_sesion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_sesion WHERE idsi_sesion = ?) AS exist`;
    keys = [idSi_sesion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion verificad@' });
    });
};

Si_sesion.insert = (Si_sesion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_sesion SET ?`;
    keys = [Si_sesion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion cread@' });
    });
};

Si_sesion.update = (Si_sesion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_sesion SET ? WHERE idsi_sesion = ? AND created_by = ?`;
        keys = [Si_sesion, Si_sesion.idsi_sesion, created_by];
    } else {
        query = `UPDATE si_sesion SET ? WHERE idsi_sesion = ?`;
        keys = [Si_sesion, Si_sesion.idsi_sesion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion actualizad@' });
    });
};

Si_sesion.remove = (idsi_sesion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_sesion WHERE idsi_sesion = ? AND created_by = ?`;
        keys = [idsi_sesion, created_by];
    } else {
        query = `DELETE FROM si_sesion WHERE idsi_sesion = ?`;
        keys = [idsi_sesion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion eliminad@' });
    });
};

Si_sesion.logicRemove = (idsi_sesion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_sesion SET is_deleted = 1 WHERE idsi_sesion = ? AND created_by = ?`;
        keys = [idsi_sesion, created_by];
    } else {
        query = `UPDATE si_sesion SET is_deleted = 1 WHERE idsi_sesion = ?`;
        keys = [idsi_sesion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_sesion eliminad@' });
    });
};

Si_sesion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_sesion;
