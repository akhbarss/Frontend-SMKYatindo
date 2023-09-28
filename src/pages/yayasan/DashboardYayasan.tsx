import {
    Contact,
    CustomCarousel,
    School,
    SchoolCard,
    VisiMisi
} from '../../components';
import { PageContent } from '../../layouts';

export const DashboardYayasan = () => {

    return (
        <div className="dashboard" >
            

            <CustomCarousel />

            <PageContent>

                <School />

                <SchoolCard />

                <VisiMisi />

                <Contact />

            </PageContent>

        </div >
    )
}

