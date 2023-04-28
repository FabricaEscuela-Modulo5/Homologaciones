import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMateria } from 'app/shared/model/materia.model';
import { getEntities as getMaterias } from 'app/entities/materia/materia.reducer';
import { ISolicitudHomologacion } from 'app/shared/model/solicitud-homologacion.model';
import { getEntities as getSolicitudHomologacions } from 'app/entities/solicitud-homologacion/solicitud-homologacion.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { IMateriaSolicitud } from 'app/shared/model/materia-solicitud.model';
import { getEntity, updateEntity, createEntity, reset } from './materia-solicitud.reducer';

export const MateriaSolicitudUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const materias = useAppSelector(state => state.materia.entities);
  const solicitudHomologacions = useAppSelector(state => state.solicitudHomologacion.entities);
  const estudiantes = useAppSelector(state => state.estudiante.entities);
  const materiaSolicitudEntity = useAppSelector(state => state.materiaSolicitud.entity);
  const loading = useAppSelector(state => state.materiaSolicitud.loading);
  const updating = useAppSelector(state => state.materiaSolicitud.updating);
  const updateSuccess = useAppSelector(state => state.materiaSolicitud.updateSuccess);

  const handleClose = () => {
    navigate('/materia-solicitud');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getMaterias({}));
    dispatch(getSolicitudHomologacions({}));
    dispatch(getEstudiantes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...materiaSolicitudEntity,
      ...values,
      materia: materias.find(it => it.id.toString() === values.materia.toString()),
      solicitudHomologacion: solicitudHomologacions.find(it => it.id.toString() === values.solicitudHomologacion.toString()),
      estudiante: estudiantes.find(it => it.id.toString() === values.estudiante.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...materiaSolicitudEntity,
          materia: materiaSolicitudEntity?.materia?.id,
          solicitudHomologacion: materiaSolicitudEntity?.solicitudHomologacion?.id,
          estudiante: materiaSolicitudEntity?.estudiante?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.materiaSolicitud.home.createOrEditLabel" data-cy="MateriaSolicitudCreateUpdateHeading">
            Create or edit a Materia Solicitud
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="materia-solicitud-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Id Solicitud"
                id="materia-solicitud-idSolicitud"
                name="idSolicitud"
                data-cy="idSolicitud"
                type="text"
              />
              <ValidatedField
                label="Codigo Materia"
                id="materia-solicitud-codigoMateria"
                name="codigoMateria"
                data-cy="codigoMateria"
                type="text"
              />
              <ValidatedField
                label="Id Semestre Pasada"
                id="materia-solicitud-idSemestrePasada"
                name="idSemestrePasada"
                data-cy="idSemestrePasada"
                type="text"
              />
              <ValidatedField
                label="Nota Definitiva"
                id="materia-solicitud-notaDefinitiva"
                name="notaDefinitiva"
                data-cy="notaDefinitiva"
                type="text"
              />
              <ValidatedField
                label="Cedula Estufiante"
                id="materia-solicitud-cedulaEstufiante"
                name="cedulaEstufiante"
                data-cy="cedulaEstufiante"
                type="text"
              />
              <ValidatedField id="materia-solicitud-materia" name="materia" data-cy="materia" label="Materia" type="select">
                <option value="" key="0" />
                {materias
                  ? materias.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="materia-solicitud-solicitudHomologacion"
                name="solicitudHomologacion"
                data-cy="solicitudHomologacion"
                label="Solicitud Homologacion"
                type="select"
              >
                <option value="" key="0" />
                {solicitudHomologacions
                  ? solicitudHomologacions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="materia-solicitud-estudiante" name="estudiante" data-cy="estudiante" label="Estudiante" type="select">
                <option value="" key="0" />
                {estudiantes
                  ? estudiantes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/materia-solicitud" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MateriaSolicitudUpdate;
