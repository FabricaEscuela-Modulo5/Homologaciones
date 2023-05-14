import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMateria } from 'app/shared/model/materia.model';
import { getEntity, updateEntity, createEntity, reset } from './materia.reducer';

export const MateriaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const materiaEntity = useAppSelector(state => state.materia.entity);
  const loading = useAppSelector(state => state.materia.loading);
  const updating = useAppSelector(state => state.materia.updating);
  const updateSuccess = useAppSelector(state => state.materia.updateSuccess);

  const handleClose = () => {
    navigate('/materia');
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
      ...materiaEntity,
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
          ...materiaEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lab32023App.materia.home.createOrEditLabel" data-cy="MateriaCreateUpdateHeading">
            Create or edit a Materia
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="materia-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Codigo Materia" id="materia-codigoMateria" name="codigoMateria" data-cy="codigoMateria" type="text" />
              <ValidatedField label="Nombre Materia" id="materia-nombreMateria" name="nombreMateria" data-cy="nombreMateria" type="text" />
              <ValidatedField label="Creditos" id="materia-creditos" name="creditos" data-cy="creditos" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/materia" replace color="info">
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

export default MateriaUpdate;
