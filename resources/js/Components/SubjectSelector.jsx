import { useState, useMemo } from 'react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Search, X, Check } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';

export default function SubjectSelector({ 
    subjects = [], 
    selectedSubjects = [], 
    onSubjectsChange,
    label = "Subjects",
    placeholder = "Search subjects..."
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Ensure selectedSubjects is always an array of numbers
    const selectedSubjectsArray = useMemo(() => {
        if (Array.isArray(selectedSubjects)) {
            return selectedSubjects.map(id => parseInt(id));
        }
        if (typeof selectedSubjects === 'string') {
            try {
                const parsed = JSON.parse(selectedSubjects);
                return Array.isArray(parsed) ? parsed.map(id => parseInt(id)) : [];
            } catch (e) {
                return [];
            }
        }
        return [];
    }, [selectedSubjects]);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set();
        subjects.forEach(subject => {
            if (subject.category?.name) {
                cats.add(subject.category.name);
            }
        });
        return Array.from(cats).sort();
    }, [subjects]);

    // Filter subjects based on search and category
    const filteredSubjects = useMemo(() => {
        return subjects.filter(subject => {
            const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || subject.category?.name === categoryFilter;
            const notSelected = !selectedSubjectsArray.includes(subject.id);
            return matchesSearch && matchesCategory && notSelected;
        });
    }, [subjects, searchTerm, categoryFilter, selectedSubjectsArray]);

    // Get selected subject objects
    const selectedSubjectObjects = useMemo(() => {
        return subjects.filter(s => selectedSubjectsArray.includes(s.id));
    }, [subjects, selectedSubjectsArray]);

    const handleAddSubject = (subjectId) => {
        if (!selectedSubjectsArray.includes(subjectId)) {
            onSubjectsChange([...selectedSubjectsArray, subjectId]);
        }
    };

    const handleRemoveSubject = (subjectId) => {
        onSubjectsChange(selectedSubjectsArray.filter(id => id !== subjectId));
    };

    return (
        <div className="space-y-4">
            <Label>{label}</Label>

            {/* Selected Subjects */}
            {selectedSubjectObjects.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-900">
                                Selected Subjects ({selectedSubjectObjects.length})
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onSubjectsChange([])}
                                className="h-6 text-xs text-blue-700 hover:text-blue-900"
                            >
                                Clear All
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedSubjectObjects.map(subject => (
                                <Badge
                                    key={subject.id}
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 pr-1 text-sm"
                                >
                                    <Check className="h-3 w-3 mr-1" />
                                    {subject.name}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSubject(subject.id)}
                                        className="ml-1 hover:bg-blue-300 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Search and Filter */}
            <div className="grid md:grid-cols-2 gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Available Subjects */}
            <Card>
                <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                        Click to add subjects ({filteredSubjects.length} available)
                    </p>
                    <div className="max-h-64 overflow-y-auto">
                        {filteredSubjects.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {filteredSubjects.map(subject => (
                                    <button
                                        key={subject.id}
                                        type="button"
                                        onClick={() => handleAddSubject(subject.id)}
                                        className="text-left p-2 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-sm"
                                    >
                                        <div className="font-medium text-gray-900">{subject.name}</div>
                                        {subject.category?.name && (
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {subject.category.name}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {searchTerm || categoryFilter !== 'all' ? (
                                    <p>No subjects found matching your search</p>
                                ) : (
                                    <p>All subjects have been selected</p>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

