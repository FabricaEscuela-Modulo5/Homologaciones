import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { getEntity, updateEntity, createEntity, reset } from './programa-academico.reducer';

export const ProgramaAcademicoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const programaAcademicoEntity = useAppSelector(state => state.programaAcademico.entity);
  const loading = useAppSelector(state => state.programaAcademico.loading);
  const updating = useAppSelector(state => state.programaAcademico.updating);
  const updateSuccess = useAppSelector(state => state.programaAcademico.updateSuccess);

  const handleClose = () => {
    navigate('/programa-academico');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...programaAcademicoEntity,
      ...values,
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
          ...programaAcademicoEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.programaAcademico.home.createOrEditLabel" data-cy="ProgramaAcademicoCreateUpdateHeading">
            Create or edit a Programa Academico
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
                <ValidatedField name="id" required readOnly id="programa-academico-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Codigo Programa"
                id="programa-academico-codigoPrograma"
                name="codigoPrograma"
                data-cy="codigoPrograma"
                type="text"
              />
              <ValidatedField
                label="Nombre Programa"
                id="programa-academico-nombrePrograma"
                name="nombrePrograma"
                data-cy="nombrePrograma"
                type="text"
              />
              <ValidatedField label="Duracion" id="programa-academico-duracion" name="duracion" data-cy="duracion" type="text" />
              <ValidatedField label="Vigencia" id="programa-academico-vigencia" name="vigencia" data-cy="vigencia" type="date" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/programa-academico" replace color="info">
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

export default ProgramaAcademicoUpdate;
