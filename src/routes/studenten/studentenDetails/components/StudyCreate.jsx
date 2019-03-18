import React from 'react';
import MyForm from '../../../../components/MyForm';
import StudyFields from '../../../../components/fields/StudyFields';

const StudyCreate = (props) => {
    return (
        <div>
            <MyForm
                fields={StudyFields}
                onSubmit={data => console.log('STUDY', data)}
                defaultValues={{
                    studentId: props.data.student.id,
                    studyCourseId: '',
                    studyRegulationId: '',
                    status: '',
                    year: ''
                }}
                onCancel={() => console.log('GO BACK')}
                studyCourses={props.data.studyCourses}
                studyRegulations={props.data.studyRegulations}
                students={props.data.students}
                loading={false}
                error={null}
            />
        </div>
    );
};

export default StudyCreate;
