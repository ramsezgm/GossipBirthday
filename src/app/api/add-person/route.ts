import Airtable from 'airtable';
import { NextRequest, NextResponse } from 'next/server';

// Configuración de Airtable con tipado
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(process.env.AIRTABLE_BASE_ID!);

export async function POST(req: NextRequest) {
    try {
        // Extrae los datos del cuerpo de la solicitud con tipado
        const { firstName, lastName, attendance }: { firstName: string; lastName: string; attendance: string } = await req.json();

        // Añadir los datos a Airtable con tipado
        await base(process.env.AIRTABLE_TABLE_NAME!).create({
            "First Name": firstName,
            "Last Name": lastName,
            "Attendance": attendance,
        });

        return NextResponse.json({ message: 'Data saved successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error saving data to Airtable:', error);
        return NextResponse.json({ message: 'Error saving data to Airtable' }, { status: 500 });
    }
}