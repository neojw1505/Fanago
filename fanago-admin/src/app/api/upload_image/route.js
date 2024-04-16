import { NextResponse } from "next/server";
import FormData from 'form-data';
import fetch from 'node-fetch';
import { Readable } from 'stream';

export const dynamic = "force-dynamic";

export const config = {
    api: {
        bodyParser: false, // Required for `request.formData()`
    },
};

export async function PATCH(request) {
    console.log("Entered PATCH function");

    try {
        // Use request.formData() to parse the incoming form data
        const formData = await request.formData();
        const eventGroupId = formData.get('eventGroupId');
        const bannerImage = formData.get('bannerImage');
        const posterImage = formData.get('posterImage');

        console.log("Received eventGroupId:", eventGroupId);
        console.log("Received files:", { bannerImage, posterImage });

        const url = process.env.BACKEND_SERVICE_URL;
        const outboundFormData = new FormData();

        if (eventGroupId) {
            outboundFormData.append('eventGroupId', eventGroupId);
        }
        if (bannerImage) {
            // Create a readable stream from the file blob
            const bannerStream = Readable.from(bannerImage.stream());
            outboundFormData.append('bannerImage', bannerStream, { filename: bannerImage.name, contentType: bannerImage.type });
        }
        if (posterImage) {
            // Create a readable stream from the file blob
            const posterStream = Readable.from(posterImage.stream());
            outboundFormData.append('posterImage', posterStream, { filename: posterImage.name, contentType: posterImage.type });
        }

        const apiResponse = await fetch(`${url}/event-manager/upload-event-image`, {
            method: 'PATCH',
            body: outboundFormData,
            headers: outboundFormData.getHeaders() // This collects content-type including the boundary.
        });

        if (!apiResponse.ok) {
            throw new Error(`Failed to upload images to external API: ${apiResponse.statusText}`);
        }

        const responseJson = await apiResponse.json();
        return NextResponse.json({ status: "success", data: responseJson });

    } catch (error) {
        console.error("Error in PATCH function:", error);
        return NextResponse.json({ status: "error", message: error.message });
    }
}
