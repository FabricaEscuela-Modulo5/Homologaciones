import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { getEntities as getProgramaAcademicos } from 'app/entities/programa-academico/programa-academico.reducer';
import { IEstadoSolicitud } from 'app/shared/model/estado-solicitud.model';
import { getEntities as getEstadoSolicituds } from 'app/entities/estado-solicitud/estado-solicitud.reducer';
import { ISolicitudHomologacion } from 'app/shared/model/solicitud-homologacion.model';
import { getEntity, updateEntity, createEntity, reset } from './solicitud-homologacion.reducer';

export const SolicitudHomologacionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const programaAcademicos = useAppSelector(state => state.programaAcademico.entities);
  const estadoSolicituds = useAppSelector(state => state.estadoSolicitud.entities);
  const solicitudHomologacionEntity = useAppSelector(state => state.solicitudHomologacion.entity);
  const loading = useAppSelector(state => state.solicitudHomologacion.loading);
  const updating = useAppSelector(state => state.solicitudHomologacion.updating);
  const updateSuccess = useAppSelector(state => state.solicitudHomologacion.updateSuccess);

  const handleClose = () => {
    navigate('/solicitud-homologacion');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProgramaAcademicos({}));
    dispatch(getEstadoSolicituds({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...solicitudHomologacionEntity,
      ...values,
      programaAcademico: programaAcademicos.find(it => it.id.toString() === values.programaAcademico.toString()),
      estadoSolicitud: estadoSolicituds.find(it => it.id.toString() === values.estadoSolicitud.toString()),
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
          ...solicitudHomologacionEntity,
          programaAcademico: solicitudHomologacionEntity?.programaAcademico?.id,
          estadoSolicitud: solicitudHomologacionEntity?.estadoSolicitud?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.solicitudHomologacion.home.createOrEditLabel" data-cy="SolicitudHomologacionCreateUpdateHeading">
            Create or edit a Solicitud Homologacion
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
                <ValidatedField name="id" required readOnly id="solicitud-homologacion-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Id Solicitud"
                id="solicitud-homologacion-idSolicitud"
                name="idSolicitud"
                data-cy="idSolicitud"
                type="text"
              />
              <ValidatedField
                label="State Solicitud"
                id="solicitud-homologacion-stateSolicitud"
                name="stateSolicitud"
                data-cy="stateSolicitud"
                type="text"
              />
              <ValidatedField
                label="Codigo Programa"
                id="solicitud-homologacion-codigoPrograma"
                name="codigoPrograma"
                data-cy="codigoPrograma"
                type="text"
              />
              <ValidatedField
                label="Fecha Solicitud"
                id="solicitud-homologacion-fechaSolicitud"
                name="fechaSolicitud"
                data-cy="fechaSolicitud"
                type="date"
              />
              <ValidatedField
                label="Comentario"
                id="solicitud-homologacion-comentario"
                name="comentario"
                data-cy="comentario"
                type="text"
              />
              <ValidatedField
                id="solicitud-homologacion-programaAcademico"
                name="programaAcademico"
                data-cy="programaAcademico"
                label="Programa Academico"
                type="select"
              >
                <option value="" key="0" />
                {programaAcademicos
                  ? programaAcademicos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="solicitud-homologacion-estadoSolicitud"
                name="estadoSolicitud"
                data-cy="estadoSolicitud"
                label="Estado Solicitud"
                type="select"
              >
                <option value="" key="0" />
                {estadoSolicituds
                  ? estadoSolicituds.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/solicitud-homologacion" replace color="info">
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

export default SolicitudHomologacionUpdate;
