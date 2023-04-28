import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { ISemestre } from 'app/shared/model/semestre.model';
import { getEntities as getSemestres } from 'app/entities/semestre/semestre.reducer';
import { ISituacionAcademica } from 'app/shared/model/situacion-academica.model';
import { getEntities as getSituacionAcademicas } from 'app/entities/situacion-academica/situacion-academica.reducer';
import { ITercio } from 'app/shared/model/tercio.model';
import { getEntities as getTercios } from 'app/entities/tercio/tercio.reducer';
import { IEstadoSemestre } from 'app/shared/model/estado-semestre.model';
import { getEntities as getEstadoSemestres } from 'app/entities/estado-semestre/estado-semestre.reducer';
import { IHistoriaAcademica } from 'app/shared/model/historia-academica.model';
import { getEntity, updateEntity, createEntity, reset } from './historia-academica.reducer';

export const HistoriaAcademicaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const estudiantes = useAppSelector(state => state.estudiante.entities);
  const semestres = useAppSelector(state => state.semestre.entities);
  const situacionAcademicas = useAppSelector(state => state.situacionAcademica.entities);
  const tercios = useAppSelector(state => state.tercio.entities);
  const estadoSemestres = useAppSelector(state => state.estadoSemestre.entities);
  const historiaAcademicaEntity = useAppSelector(state => state.historiaAcademica.entity);
  const loading = useAppSelector(state => state.historiaAcademica.loading);
  const updating = useAppSelector(state => state.historiaAcademica.updating);
  const updateSuccess = useAppSelector(state => state.historiaAcademica.updateSuccess);

  const handleClose = () => {
    navigate('/historia-academica');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getEstudiantes({}));
    dispatch(getSemestres({}));
    dispatch(getSituacionAcademicas({}));
    dispatch(getTercios({}));
    dispatch(getEstadoSemestres({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...historiaAcademicaEntity,
      ...values,
      estudiante: estudiantes.find(it => it.id.toString() === values.estudiante.toString()),
      semestre: semestres.find(it => it.id.toString() === values.semestre.toString()),
      situacionAcademica: situacionAcademicas.find(it => it.id.toString() === values.situacionAcademica.toString()),
      tercio: tercios.find(it => it.id.toString() === values.tercio.toString()),
      estadoSemestre: estadoSemestres.find(it => it.id.toString() === values.estadoSemestre.toString()),
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
          ...historiaAcademicaEntity,
          estudiante: historiaAcademicaEntity?.estudiante?.id,
          semestre: historiaAcademicaEntity?.semestre?.id,
          situacionAcademica: historiaAcademicaEntity?.situacionAcademica?.id,
          tercio: historiaAcademicaEntity?.tercio?.id,
          estadoSemestre: historiaAcademicaEntity?.estadoSemestre?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.historiaAcademica.home.createOrEditLabel" data-cy="HistoriaAcademicaCreateUpdateHeading">
            Create or edit a Historia Academica
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
                <ValidatedField name="id" required readOnly id="historia-academica-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Id Historia Academica"
                id="historia-academica-idHistoriaAcademica"
                name="idHistoriaAcademica"
                data-cy="idHistoriaAcademica"
                type="text"
              />
              <ValidatedField
                label="Cedula Estudiante"
                id="historia-academica-cedulaEstudiante"
                name="cedulaEstudiante"
                data-cy="cedulaEstudiante"
                type="text"
              />
              <ValidatedField label="Id Semestre" id="historia-academica-idSemestre" name="idSemestre" data-cy="idSemestre" type="text" />
              <ValidatedField
                label="Codigo Programa"
                id="historia-academica-codigoPrograma"
                name="codigoPrograma"
                data-cy="codigoPrograma"
                type="text"
              />
              <ValidatedField
                label="Promedio Acomulado"
                id="historia-academica-promedioAcomulado"
                name="promedioAcomulado"
                data-cy="promedioAcomulado"
                type="text"
              />
              <ValidatedField
                label="Promedio Semestre"
                id="historia-academica-promedioSemestre"
                name="promedioSemestre"
                data-cy="promedioSemestre"
                type="text"
              />
              <ValidatedField label="Id Tercio" id="historia-academica-idTercio" name="idTercio" data-cy="idTercio" type="text" />
              <ValidatedField
                label="Situation Academica"
                id="historia-academica-situationAcademica"
                name="situationAcademica"
                data-cy="situationAcademica"
                type="text"
              />
              <ValidatedField
                label="State Semestre"
                id="historia-academica-stateSemestre"
                name="stateSemestre"
                data-cy="stateSemestre"
                type="text"
              />
              <ValidatedField id="historia-academica-estudiante" name="estudiante" data-cy="estudiante" label="Estudiante" type="select">
                <option value="" key="0" />
                {estudiantes
                  ? estudiantes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="historia-academica-semestre" name="semestre" data-cy="semestre" label="Semestre" type="select">
                <option value="" key="0" />
                {semestres
                  ? semestres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="historia-academica-situacionAcademica"
                name="situacionAcademica"
                data-cy="situacionAcademica"
                label="Situacion Academica"
                type="select"
              >
                <option value="" key="0" />
                {situacionAcademicas
                  ? situacionAcademicas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="historia-academica-tercio" name="tercio" data-cy="tercio" label="Tercio" type="select">
                <option value="" key="0" />
                {tercios
                  ? tercios.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="historia-academica-estadoSemestre"
                name="estadoSemestre"
                data-cy="estadoSemestre"
                label="Estado Semestre"
                type="select"
              >
                <option value="" key="0" />
                {estadoSemestres
                  ? estadoSemestres.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/historia-academica" replace color="info">
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

export default HistoriaAcademicaUpdate;
