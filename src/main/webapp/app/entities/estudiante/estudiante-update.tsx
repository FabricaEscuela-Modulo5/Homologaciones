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
import { IPlanEstudios } from 'app/shared/model/plan-estudios.model';
import { getEntities as getPlanEstudios } from 'app/entities/plan-estudios/plan-estudios.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntity, updateEntity, createEntity, reset } from './estudiante.reducer';

export const EstudianteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const programaAcademicos = useAppSelector(state => state.programaAcademico.entities);
  const planEstudios = useAppSelector(state => state.planEstudios.entities);
  const estudianteEntity = useAppSelector(state => state.estudiante.entity);
  const loading = useAppSelector(state => state.estudiante.loading);
  const updating = useAppSelector(state => state.estudiante.updating);
  const updateSuccess = useAppSelector(state => state.estudiante.updateSuccess);

  const handleClose = () => {
    navigate('/estudiante');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProgramaAcademicos({}));
    dispatch(getPlanEstudios({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...estudianteEntity,
      ...values,
      programaAcademico: programaAcademicos.find(it => it.id.toString() === values.programaAcademico.toString()),
      planEstudios: planEstudios.find(it => it.id.toString() === values.planEstudios.toString()),
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
          ...estudianteEntity,
          programaAcademico: estudianteEntity?.programaAcademico?.id,
          planEstudios: estudianteEntity?.planEstudios?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.estudiante.home.createOrEditLabel" data-cy="EstudianteCreateUpdateHeading">
            Create or edit a Estudiante
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="estudiante-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Cedula" id="estudiante-cedula" name="cedula" data-cy="cedula" type="text" />
              <ValidatedField label="Nombre" id="estudiante-nombre" name="nombre" data-cy="nombre" type="text" />
              <ValidatedField label="Apellido" id="estudiante-apellido" name="apellido" data-cy="apellido" type="text" />
              <ValidatedField
                label="Correo Institucional"
                id="estudiante-correoInstitucional"
                name="correoInstitucional"
                data-cy="correoInstitucional"
                type="text"
              />
              <ValidatedField
                label="Correo Personal"
                id="estudiante-correoPersonal"
                name="correoPersonal"
                data-cy="correoPersonal"
                type="text"
              />
              <ValidatedField label="Celular" id="estudiante-celular" name="celular" data-cy="celular" type="text" />
              <ValidatedField label="Estrato" id="estudiante-estrato" name="estrato" data-cy="estrato" type="text" />
              <ValidatedField label="Fecha Ingreso" id="estudiante-fechaIngreso" name="fechaIngreso" data-cy="fechaIngreso" type="date" />
              <ValidatedField label="Version" id="estudiante-version" name="version" data-cy="version" type="text" />
              <ValidatedField
                label="Codigo Programa"
                id="estudiante-codigoPrograma"
                name="codigoPrograma"
                data-cy="codigoPrograma"
                type="text"
              />
              <ValidatedField
                id="estudiante-programaAcademico"
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
              <ValidatedField id="estudiante-planEstudios" name="planEstudios" data-cy="planEstudios" label="Plan Estudios" type="select">
                <option value="" key="0" />
                {planEstudios
                  ? planEstudios.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/estudiante" replace color="info">
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

export default EstudianteUpdate;
