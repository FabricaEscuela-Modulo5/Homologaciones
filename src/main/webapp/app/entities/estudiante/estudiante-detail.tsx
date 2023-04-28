import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './estudiante.reducer';

export const EstudianteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const estudianteEntity = useAppSelector(state => state.estudiante.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="estudianteDetailsHeading">Estudiante</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{estudianteEntity.id}</dd>
          <dt>
            <span id="cedula">Cedula</span>
          </dt>
          <dd>{estudianteEntity.cedula}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{estudianteEntity.nombre}</dd>
          <dt>
            <span id="apellido">Apellido</span>
          </dt>
          <dd>{estudianteEntity.apellido}</dd>
          <dt>
            <span id="correoInstitucional">Correo Institucional</span>
          </dt>
          <dd>{estudianteEntity.correoInstitucional}</dd>
          <dt>
            <span id="correoPersonal">Correo Personal</span>
          </dt>
          <dd>{estudianteEntity.correoPersonal}</dd>
          <dt>
            <span id="celular">Celular</span>
          </dt>
          <dd>{estudianteEntity.celular}</dd>
          <dt>
            <span id="estrato">Estrato</span>
          </dt>
          <dd>{estudianteEntity.estrato}</dd>
          <dt>
            <span id="fechaIngreso">Fecha Ingreso</span>
          </dt>
          <dd>
            {estudianteEntity.fechaIngreso ? (
              <TextFormat value={estudianteEntity.fechaIngreso} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="version">Version</span>
          </dt>
          <dd>{estudianteEntity.version}</dd>
          <dt>
            <span id="codigoPrograma">Codigo Programa</span>
          </dt>
          <dd>{estudianteEntity.codigoPrograma}</dd>
          <dt>Programa Academico</dt>
          <dd>{estudianteEntity.programaAcademico ? estudianteEntity.programaAcademico.id : ''}</dd>
          <dt>Plan Estudios</dt>
          <dd>{estudianteEntity.planEstudios ? estudianteEntity.planEstudios.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/estudiante" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estudiante/${estudianteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EstudianteDetail;
