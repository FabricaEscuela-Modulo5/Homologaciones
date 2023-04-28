import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISituacionAcademica } from 'app/shared/model/situacion-academica.model';
import { getEntity, updateEntity, createEntity, reset } from './situacion-academica.reducer';

export const SituacionAcademicaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const situacionAcademicaEntity = useAppSelector(state => state.situacionAcademica.entity);
  const loading = useAppSelector(state => state.situacionAcademica.loading);
  const updating = useAppSelector(state => state.situacionAcademica.updating);
  const updateSuccess = useAppSelector(state => state.situacionAcademica.updateSuccess);

  const handleClose = () => {
    navigate('/situacion-academica');
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
      ...situacionAcademicaEntity,
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
          ...situacionAcademicaEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.situacionAcademica.home.createOrEditLabel" data-cy="SituacionAcademicaCreateUpdateHeading">
            Create or edit a Situacion Academica
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
                <ValidatedField name="id" required readOnly id="situacion-academica-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Id Situacion Academica"
                id="situacion-academica-idSituacionAcademica"
                name="idSituacionAcademica"
                data-cy="idSituacionAcademica"
                type="text"
              />
              <ValidatedField
                label="Situation Academica"
                id="situacion-academica-situationAcademica"
                name="situationAcademica"
                data-cy="situationAcademica"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/situacion-academica" replace color="info">
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

export default SituacionAcademicaUpdate;
