import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PackageSection } from '@/components/PackageSection';
import { CustomPackageForm } from '@/components/CustomPackageForm';
import { Footer } from '@/components/Footer';
import { getPackagesByCategory } from '@/data/packages';

const Index = () => {
  const europePackages = getPackagesByCategory('europe');
  const indiaPackages = getPackagesByCategory('india');
  const honeymoonPackages = getPackagesByCategory('honeymoon');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      <div id="packages">
        <PackageSection
          id="europe"
          title="Explore Europe"
          subtitle="Paris, Swiss, London & More"
          packages={europePackages.slice(0, 4)}
          viewAllLink="/category/europe"
        />

        <div className="bg-muted/30">
          <PackageSection
            id="india"
            title="Incredible India"
            subtitle="Kashmir to Kanyakumari"
            packages={indiaPackages.slice(0, 4)}
            viewAllLink="/category/india"
          />
        </div>

        <PackageSection
          id="honeymoon"
          title="Honeymoon Specials"
          subtitle="Most romantic getaways for couples"
          packages={honeymoonPackages.slice(0, 4)}
          viewAllLink="/category/honeymoon"
        />
      </div>

      <CustomPackageForm />

      <Footer />
    </div>
  );
};

export default Index;
