const Si_rol_permiso = {};

Si_rol_permiso.findByIdSi_permiso = (idSi_permiso, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_rol_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_permiso_idsi_permiso.nombre as si_permiso_si_permiso_idsi_permiso 
             FROM si_rol_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_rol_permiso.si_rol_idsi_rol INNER JOIN si_permiso as _si_permiso_idsi_permiso ON _si_permiso_idsi_permiso.idsi_permiso = si_rol_permiso.si_permiso_idsi_permiso 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_rol_permiso.created_by ` : ""} 
             WHERE si_rol_permiso.is_deleted = false 
                  AND si_rol_permiso.si_permiso_idsi_permiso = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_rol_permiso.created_by = ?` : ""}`
        keys = [idSi_permiso];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso encontrad@' });
    });
};

Si_rol_permiso.findByIdSi_rol = (idSi_rol, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_rol_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_permiso_idsi_permiso.nombre as si_permiso_si_permiso_idsi_permiso 
             FROM si_rol_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_rol_permiso.si_rol_idsi_rol INNER JOIN si_permiso as _si_permiso_idsi_permiso ON _si_permiso_idsi_permiso.idsi_permiso = si_rol_permiso.si_permiso_idsi_permiso 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_rol_permiso.created_by ` : ""} 
             WHERE si_rol_permiso.is_deleted = false 
                  AND si_rol_permiso.si_rol_idsi_rol = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_rol_permiso.created_by = ?` : ""}`
        keys = [idSi_rol];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso encontrad@' });
    });
};

Si_rol_permiso.findFromTo = (fechaDesde, fechaHasta, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_rol_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_permiso_idsi_permiso.nombre as si_permiso_si_permiso_idsi_permiso 
             FROM si_rol_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_rol_permiso.si_rol_idsi_rol INNER JOIN si_permiso as _si_permiso_idsi_permiso ON _si_permiso_idsi_permiso.idsi_permiso = si_rol_permiso.si_permiso_idsi_permiso 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_rol_permiso.created_by ` : ""} 
             WHERE si_rol_permiso.is_deleted = false 
                  AND si_rol_permiso.created_at BETWEEN ? AND ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_rol_permiso.created_by = ?` : ""}`
        keys = [fechaDesde, fechaHasta];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;
    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso leíd@' });
    });
};

Si_rol_permiso.all = (user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_rol_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_permiso_idsi_permiso.nombre as si_permiso_si_permiso_idsi_permiso 
             FROM si_rol_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_rol_permiso.si_rol_idsi_rol INNER JOIN si_permiso as _si_permiso_idsi_permiso ON _si_permiso_idsi_permiso.idsi_permiso = si_rol_permiso.si_permiso_idsi_permiso 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_rol_permiso.created_by ` : ""} 
             WHERE si_rol_permiso.is_deleted = false 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_rol_permiso.created_by = ?` : ""}`
        keys = [];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso leíd@' });
    });
};

Si_rol_permiso.findById = (idSi_rol_permiso, user, only_own, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT si_rol_permiso.*, _si_rol_idsi_rol.nombre as si_rol_si_rol_idsi_rol , _si_permiso_idsi_permiso.nombre as si_permiso_si_permiso_idsi_permiso 
             FROM si_rol_permiso 
             INNER JOIN si_rol as _si_rol_idsi_rol ON _si_rol_idsi_rol.idsi_rol = si_rol_permiso.si_rol_idsi_rol INNER JOIN si_permiso as _si_permiso_idsi_permiso ON _si_permiso_idsi_permiso.idsi_permiso = si_rol_permiso.si_permiso_idsi_permiso 
              
              
             ${user.estado_idestado ? `INNER JOIN si_user as _si_user ON _si_user.idsi_user = si_rol_permiso.created_by ` : ""} 
             WHERE si_rol_permiso.is_deleted = false 
                  AND idsi_rol_permiso = ? 
                  ${user.estado_idestado ? `AND _si_user.estado_idestado = ? ` : ""}
                  ${only_own ? `AND si_rol_permiso.created_by = ?` : ""}`
        keys = [idSi_rol_permiso];
        user.estado_idestado ? keys.push(user.estado_idestado) : null;
        only_own ? keys.push(user.idsi_user) : null;

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso encontrad@' });
    });
};

Si_rol_permiso.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT COUNT(idsi_rol_permiso) AS count FROM si_rol_permiso`;
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso contabilizad@' });
    });
};

Si_rol_permiso.exist = (idSi_rol_permiso, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `SELECT EXISTS(SELECT 1 FROM si_rol_permiso WHERE idsi_rol_permiso = ?) AS exist`;
    keys = [idSi_rol_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso verificad@' });
    });
};

Si_rol_permiso.insert = (Si_rol_permiso, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = `INSERT INTO si_rol_permiso SET ?`;
    keys = [Si_rol_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso cread@' });
    });
};

Si_rol_permiso.update = (Si_rol_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_rol_permiso SET ? WHERE idsi_rol_permiso = ? AND created_by = ?`;
        keys = [Si_rol_permiso, Si_rol_permiso.idsi_rol_permiso, created_by];
    } else {
        query = `UPDATE si_rol_permiso SET ? WHERE idsi_rol_permiso = ?`;
        keys = [Si_rol_permiso, Si_rol_permiso.idsi_rol_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso actualizad@' });
    });
};

Si_rol_permiso.remove = (idsi_rol_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `DELETE FROM si_rol_permiso WHERE idsi_rol_permiso = ? AND created_by = ?`;
        keys = [idsi_rol_permiso, created_by];
    } else {
        query = `DELETE FROM si_rol_permiso WHERE idsi_rol_permiso = ?`;
        keys = [idsi_rol_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso eliminad@' });
    });
};

Si_rol_permiso.logicRemove = (idsi_rol_permiso, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = `UPDATE si_rol_permiso SET is_deleted = 1 WHERE idsi_rol_permiso = ? AND created_by = ?`;
        keys = [idsi_rol_permiso, created_by];
    } else {
        query = `UPDATE si_rol_permiso SET is_deleted = 1 WHERE idsi_rol_permiso = ?`;
        keys = [idsi_rol_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol_permiso eliminad@' });
    });
};

Si_rol_permiso.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_rol_permiso;
