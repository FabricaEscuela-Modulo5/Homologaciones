import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './historia-academica.reducer';

export const HistoriaAcademicaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const historiaAcademicaEntity = useAppSelector(state => state.historiaAcademica.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="historiaAcademicaDetailsHeading">Historia Academica</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{historiaAcademicaEntity.id}</dd>
          <dt>
            <span id="idHistoriaAcademica">Id Historia Academica</span>
          </dt>
          <dd>{historiaAcademicaEntity.idHistoriaAcademica}</dd>
          <dt>
            <span id="cedulaEstudiante">Cedula Estudiante</span>
          </dt>
          <dd>{historiaAcademicaEntity.cedulaEstudiante}</dd>
          <dt>
            <span id="idSemestre">Id Semestre</span>
          </dt>
          <dd>{historiaAcademicaEntity.idSemestre}</dd>
          <dt>
            <span id="codigoPrograma">Codigo Programa</span>
          </dt>
          <dd>{historiaAcademicaEntity.codigoPrograma}</dd>
          <dt>
            <span id="promedioAcomulado">Promedio Acomulado</span>
          </dt>
          <dd>{historiaAcademicaEntity.promedioAcomulado}</dd>
          <dt>
            <span id="promedioSemestre">Promedio Semestre</span>
          </dt>
          <dd>{historiaAcademicaEntity.promedioSemestre}</dd>
          <dt>
            <span id="idTercio">Id Tercio</span>
          </dt>
          <dd>{historiaAcademicaEntity.idTercio}</dd>
          <dt>
            <span id="situationAcademica">Situation Academica</span>
          </dt>
          <dd>{historiaAcademicaEntity.situationAcademica}</dd>
          <dt>
            <span id="stateSemestre">State Semestre</span>
          </dt>
          <dd>{historiaAcademicaEntity.stateSemestre}</dd>
          <dt>Estudiante</dt>
          <dd>{historiaAcademicaEntity.estudiante ? historiaAcademicaEntity.estudiante.id : ''}</dd>
          <dt>Semestre</dt>
          <dd>{historiaAcademicaEntity.semestre ? historiaAcademicaEntity.semestre.id : ''}</dd>
          <dt>Situacion Academica</dt>
          <dd>{historiaAcademicaEntity.situacionAcademica ? historiaAcademicaEntity.situacionAcademica.id : ''}</dd>
          <dt>Tercio</dt>
          <dd>{historiaAcademicaEntity.tercio ? historiaAcademicaEntity.tercio.id : ''}</dd>
          <dt>Estado Semestre</dt>
          <dd>{historiaAcademicaEntity.estadoSemestre ? historiaAcademicaEntity.estadoSemestre.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/historia-academica" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/historia-academica/${historiaAcademicaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default HistoriaAcademicaDetail;
