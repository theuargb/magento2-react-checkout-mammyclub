import React from 'react';
import { InpostGeowidget } from 'react-inpost-geowidget';
import { func } from 'prop-types';

function InPostGeoWidget({ onPointCallback }) {
  return (
    <div>
      <div style={{ height: '500px' }}>
        <InpostGeowidget
          token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjE5OTQxNDExODQsImlhdCI6MTY3ODc4MTE4NCwianRpIjoiZDk5MjRjMmMtMGJlNi00NDFlLWFiNWYtMWVhZmZhNDMwMDE1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOnJCMk5TaXV1UUtKSlpZa3JfYThSU1pPVEh3dXAydk9ibmd6WTBacGZ2RDAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiJjMzY3NDZmMi0xZWRjLTQyN2EtYTI1NC1kYTUwZTI2ZGQ5MmYiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiYzM2NzQ2ZjItMWVkYy00MjdhLWEyNTQtZGE1MGUyNmRkOTJmIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiJtYW1teWNsdWIucGVyc3BlY3RpdmUubmV0LnVhLCoucGVyc3BlY3RpdmUubmV0LnVhIiwidXVpZCI6IjFmZWM3NDBjLWUwYTQtNDUyZS05YWU1LTdmOWM4ZThlYTM5MiJ9.ZhtUpZD9C8pM_vU9mAojpvXO5I6rtIYMbOONN9c4KF09saKS8HVcft4MwWxMQCJJndFg66vV0CkMnmsoxWiGabvncUTVTAE5GM9RKESSHyLFciBs1ttf9GhFzYzdUBIMRvxcm5P1tScJF-lWu4_e4XUM9XLxmVN59g1RmDmg_chLpPixX5IsR5P5au2L8qiT-yVj6v87TNx3P1HIMPDqvAikZEJi556gSfHFG98SH_j-QeJzRaM5naVZiqzZWjzVSN3MGSHa7S2Gmx_RujbgRmkWmx3hT4b6W0oRK8Gtuuwp6RyHYLZiAnYEMvVag3QbGOwC4hbDjjGxJNA3XoN94Q"
          onPoint={onPointCallback}
        />
      </div>
    </div>
  );
}

InPostGeoWidget.propTypes = {
  onPointCallback: func.isRequired,
};

export default InPostGeoWidget;
