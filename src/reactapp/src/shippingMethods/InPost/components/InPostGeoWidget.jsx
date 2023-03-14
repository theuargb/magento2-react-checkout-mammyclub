import React from 'react';
import { func } from 'prop-types';
import { InpostGeowidget } from '../lib/InpostGeowidget.ts';

function InPostGeoWidget({ onPointCallback }) {
  return (
    <div>
      <div style={{ height: '500px' }}>
        <InpostGeowidget
          token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjE5OTM4MjI1NDIsImlhdCI6MTY3ODQ2MjU0MiwianRpIjoiNzk0NDdhNWMtMDNkNy00ZTg4LTg0ZjUtMjIyY2EyZTIxNTlmIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOnJCMk5TaXV1UUtKSlpZa3JfYThSU1pPVEh3dXAydk9ibmd6WTBacGZ2RDAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiIzNWFjZjM4Ny1kZDNiLTQyYjctODBhYi1lM2ViZmQ4ZTE0MmMiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiMzVhY2YzODctZGQzYi00MmI3LTgwYWItZTNlYmZkOGUxNDJjIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiIiLCJ1dWlkIjoiMWZlYzc0MGMtZTBhNC00NTJlLTlhZTUtN2Y5YzhlOGVhMzkyIn0.hKDhsDeWMmuC8pSPh_O3mBRNbJ2oh_arrSDJrkIMzSAVyPwnuuciTjC27GoSkK9QfhamVXfTVyh9QfTdr7TMvLYehjWjRWdDROJV571AMDPaGhuSRtNyB6BJuLqubbF5LrQC5ndDN0TodQ8JaZD2JZbGCN8jfm2_WQNLq4z2omzz3mW3vkQ-EFH4pEW_Uh7DnZkK0rfUNddT4aS9taklPsLqPA4k8B7GYm7lAi6t_NUr2RBE67FyMMHv-WfYUmnNHimd7J4RJ6af6ocBel5lAG5pHQnJQRhyCaWXif4puKBQ3QY-PWGvW3u4L_s6g1nMm4wFFBCUNkALpiubfoVvxw"
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
