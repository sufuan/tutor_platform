import { useState, useEffect } from 'react';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

// Fallback data for Bangladesh divisions and districts
const BANGLADESH_DIVISIONS = {
    'Dhaka': ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
    'Chattogram': ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', 'Cumilla', "Cox's Bazar", 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
    'Rajshahi': ['Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Chapai Nawabganj', 'Pabna', 'Rajshahi', 'Sirajganj'],
    'Khulna': ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
    'Barishal': ['Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
    'Sylhet': ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
    'Rangpur': ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'],
    'Mymensingh': ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur']
};

export default function LocationDropdown({ 
    divisionValue, 
    districtValue, 
    onDivisionChange, 
    onDistrictChange,
    divisionLabel = "Division",
    districtLabel = "District",
    showLabels = true,
    className = ""
}) {
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load divisions on component mount
    useEffect(() => {
        // Set divisions from static data
        const divisionNames = Object.keys(BANGLADESH_DIVISIONS);
        setDivisions(divisionNames.map(name => ({ division: name })));
    }, []);

    // Update districts when division changes
    useEffect(() => {
        if (divisionValue && divisionValue !== 'all') {
            const districtList = BANGLADESH_DIVISIONS[divisionValue] || [];
            setDistricts(districtList);
        } else {
            setDistricts([]);
            onDistrictChange && onDistrictChange('');
        }
    }, [divisionValue]);

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Division Dropdown */}
            <div>
                {showLabels && <Label>{divisionLabel}</Label>}
                <Select 
                    value={divisionValue || ''} 
                    onValueChange={(value) => {
                        onDivisionChange(value);
                        // Reset district when division changes
                        onDistrictChange && onDistrictChange('');
                    }}
                    disabled={loading}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={loading ? "Loading..." : "Select Division"} />
                    </SelectTrigger>
                    <SelectContent>
                        {divisions.map((division, index) => (
                            <SelectItem key={index} value={division.division}>
                                {division.division}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* District Dropdown */}
            {divisionValue && divisionValue !== 'all' && (
                <div>
                    {showLabels && <Label>{districtLabel}</Label>}
                    <Select 
                        value={districtValue || ''} 
                        onValueChange={onDistrictChange}
                        disabled={loading || !districts.length}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={loading ? "Loading..." : districts.length ? "Select District" : "No districts available"} />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((district, index) => (
                                <SelectItem key={`${district}-${index}`} value={district}>
                                    {district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
}