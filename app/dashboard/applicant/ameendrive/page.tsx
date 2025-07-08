import { AmeenDriveBankUseOnlyForm } from "@/components/forms/ameendrive/AmeenDriveBankUseOnlyForm";
import { AmeenDriveIncomeBankDetailsForm } from "@/components/forms/ameendrive/AmeenDriveIncomeBankDetailsForm";
import { AmeenDriveNonTaxPayersForm } from "@/components/forms/ameendrive/AmeenDriveNonTaxPayersForm";
import { AmeenDriveOccupationForm } from "@/components/forms/ameendrive/AmeenDriveOccupationForm";
import { AmeenDrivePersonalDetailsForm } from "@/components/forms/ameendrive/AmeenDrivePersonalDetailsForm";
import { AmeenDriveProductProgramForm } from "@/components/forms/ameendrive/AmeenDriveProductProgramForm";
import { AmeenDriveProfessionDetailsForm } from "@/components/forms/ameendrive/AmeenDriveProfessionDetailsForm";
import { AmeenDriveReferenceDetailsForm } from "@/components/forms/ameendrive/AmeenDriveReferenceDetailsForm";
import { AmeenDriveSignatureSectionForm } from "@/components/forms/ameendrive/AmeenDriveSignatureSectionForm";
import AmeenDriveStampsForm from "@/components/forms/ameendrive/AmeenDriveStampsForm";
import { AmeenDriveTakafulDetailsForm } from "@/components/forms/ameendrive/AmeenDriveTakafulDetailsForm";
import { AmeenDriveVehicleDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleDetailsForm";
import { AmeenDriveVehicleFacilityDetailsForm } from "@/components/forms/ameendrive/AmeenDriveVehicleFacilityDetailsForm";

export default function AmeenDrivePage() {
    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-primary">
                UBL Ameen Drive Application Form
            </h1>
            <form className="space-y-10">
                <AmeenDriveProductProgramForm />
                <AmeenDriveVehicleDetailsForm />
                <AmeenDriveTakafulDetailsForm />
                <AmeenDriveVehicleFacilityDetailsForm />
                <AmeenDrivePersonalDetailsForm />
                <AmeenDriveOccupationForm />
                <AmeenDriveProfessionDetailsForm />
                <AmeenDriveIncomeBankDetailsForm />
                <AmeenDriveReferenceDetailsForm />
<AmeenDriveSignatureSectionForm />
<AmeenDriveBankUseOnlyForm />
<AmeenDriveNonTaxPayersForm />
<AmeenDriveStampsForm />

               
              

            </form>
        </div>
    );
}
