import React from 'react';
import { InpostGeowidget } from 'react-inpost-geowidget';
import { func } from 'prop-types';

function InPostGeoWidget({ onPointCallback }) {
  return (
    <div>
      <div style={{ height: '500px' }}>
        <InpostGeowidget
          token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjE5OTQwODAxNDUsImlhdCI6MTY3ODcyMDE0NSwianRpIjoiNDIwOTliZWQtZjU5MS00MDdmLWE5NTktMzc3MmUxNzMzY2QyIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOnJCMk5TaXV1UUtKSlpZa3JfYThSU1pPVEh3dXAydk9ibmd6WTBacGZ2RDAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiJkOGNlNTA0NS02YTViLTRmZGItOTY5OS1lNDEwYjQ0NzlmNmMiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiZDhjZTUwNDUtNmE1Yi00ZmRiLTk2OTktZTQxMGI0NDc5ZjZjIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiJtYW1teWNsdWIucGVyc3BlY3RpdmUubmV0LnVhIiwidXVpZCI6IjFmZWM3NDBjLWUwYTQtNDUyZS05YWU1LTdmOWM4ZThlYTM5MiJ9.ZnJ2jFytE63BSivssH-jD1M7nK_HHGMhhr2HqpfkLQbKoqaq9A9Ru0-tiBMc6qiowNYJLkmh-C3U5xCigDoI6nMq2j_PUfcUOTcVgeaHUgg4eP7GlZllI1NCahwS2T2urSSjZzOd861ryerVA1S9H9rg48Ohosk5JXgIuXmxlk_RldzbQ9BB6RTRLGrxRmAQXSAyCsZcvM-oMBPaok-o02FDbEN4-ujYIWrgbS27fFYZzqhiGXYGAzdfgnywko2JrBLReOH50Va8uDa1bINHXnBZSoABiktTi30pd7AnrsDAqyXzAjFeVno9IQpwPx4pwm0G-eFTRfpHeJo8Fhb14A"
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
