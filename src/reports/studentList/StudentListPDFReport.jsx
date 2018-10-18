import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: '16px',
    },
    title: {
        fontSize: '2rem'
    },
    table: {
        flexDirection: 'column'
    },
    thead: {
        flexDirection: 'column',
        backgroundColor: '#ddd',
    },
    tbody: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    headCell: {
        minWidth: '200px',
        padding: '8px',
        fontWeight: 'bold',
        border: '1px solid #aaa'
    },
    bodyCell: {
        minWidth: '200px',
        padding: '8px',
        border: '1px solid #aaa'
    }
});

const StudentListPDFReport = ({ students }) => (
    <Document>
        <Page size='A4' style={styles.page} orientation='landscape'>

            <View>
                <Text style={styles.title}>Mitgliederliste</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.thead}>
                    <View style={styles.row}>
                        <View style={styles.headCell}><Text>Matr.-Nr.</Text></View>
                        <View style={styles.headCell}><Text>Vorname</Text></View>
                        <View style={styles.headCell}><Text>Nachname</Text></View>
                        {/* <View style={styles.headCell}><Text>Geburtsdatum</Text></View>
                        <View style={styles.headCell}><Text>E-Mail (Uni)</Text></View>
                        <View style={styles.headCell}><Text>E-Mail (privatP</Text></View>
                        <View style={styles.headCell}><Text>Festnetz</Text></View>
                        <View style={styles.headCell}><Text>Mobiletelefon</Text></View> */}
                    </View>
                </View>
                <View style={styles.tbody}>
                    {students && students.map(student => (
                        <View style={styles.row} key={student.id}>
                            <View style={styles.bodyCell}><Text>{student.matrikelnummer}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.firstName}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.lastName}</Text></View>
                            {/* <View style={styles.bodyCell}><Text>{student.studentInformations[0].birthDate}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.studentInformations[0].mailUni}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.studentInformations[0].mailPrivate}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.studentInformations[0].phoneNumber}</Text></View>
                            <View style={styles.bodyCell}><Text>{student.studentInformations[0].mobileNumber}</Text></View> */}
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);


export default StudentListPDFReport;
