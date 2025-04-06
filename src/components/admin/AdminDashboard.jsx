import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  TablePagination,
  Link,
  Modal,
  Grid,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingIcon from '@mui/icons-material/Pending';

const AdminDashboard = () => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAllComplaints, setShowAllComplaints] = useState(false);
  
  // State for complaint detail modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  // State for assign complaint modal
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  
  // State for update status modal
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  // State for filter modal
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterAssignment, setFilterAssignment] = useState('all');
  const [filterVolunteers, setFilterVolunteers] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState(null);

  // State for selected volunteers (changed to array for multiple selection)
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [dueDate, setDueDate] = useState('');
  
  // State for complaints data
  const [complaintsData, setComplaintsData] = useState([
    {
      id: '1245',
      date: '02-05-2023',
      complainant: 'Raj Mehta',
      issue: 'Pothole near SGNP entrance',
      status: 'Pending',
      assignment: 'Unassigned',
      location: 'Borivali East, Mumbai - 400066',
      description: 'There is a large pothole at the entrance of Sanjay Gandhi National Park that has been causing accidents and traffic congestion. It\'s approximately 2 feet wide and needs immediate attention.',
      contactNumber: '9876543210',
      email: 'raj.mehta@example.com'
    },
    {
      id: '1244',
      date: '01-05-2023',
      complainant: 'Priya Shah',
      issue: 'Traffic signal malfunction',
      status: 'In Progress',
      assignment: 'Unassigned',
      location: 'Andheri West, Mumbai - 400053',
      description: 'The traffic signal at the Andheri West junction has been malfunctioning for the past week. It stays red for all directions causing major traffic jams during peak hours.',
      contactNumber: '9876543211',
      email: 'priya.shah@example.com'
    },
    {
      id: '1243',
      date: '30-04-2023',
      complainant: 'Amit Patel',
      issue: 'Garbage not collected',
      status: 'Resolved',
      assignment: 'Unassigned',
      location: 'Dadar, Mumbai - 400014',
      description: 'The garbage hasn\'t been collected from our area for three days. This is causing foul smell and hygiene issues for residents.',
      contactNumber: '9876543212',
      email: 'amit.patel@example.com'
    },
    {
      id: '1242',
      date: '28-04-2023',
      complainant: 'Meera Patel',
      issue: 'Drainage overflow',
      status: 'In Progress',
      assignment: 'Unassigned',
      location: 'Chembur, Mumbai - 400071',
      description: 'The drainage system near Chembur station is overflowing during high tide and rains, causing waterlogging and traffic issues.',
      contactNumber: '9876543213',
      email: 'meera.patel@example.com'
    },
    {
      id: '1241',
      date: '27-04-2023',
      complainant: 'Rahul Desai',
      issue: 'Broken street light',
      status: 'Resolved',
      assignment: 'Unassigned',
      location: 'Malad West, Mumbai - 400064',
      description: 'Three street lights on Link Road near Malad station are not working for the past two weeks, making it unsafe at night.',
      contactNumber: '9876543214',
      email: 'rahul.desai@example.com'
    },
    {
      id: '1240',
      date: '26-04-2023',
      complainant: 'Sunita Sharma',
      issue: 'Water logging issue',
      status: 'Pending',
      assignment: 'Unassigned',
      location: 'Kurla East, Mumbai - 400024',
      description: 'After every small rain, water gets logged in front of our building entrance making it difficult for residents to enter/exit.',
      contactNumber: '9876543215',
      email: 'sunita.sharma@example.com'
    },
    {
      id: '1239',
      date: '25-04-2023',
      complainant: 'Vikram Singh',
      issue: 'Broken sidewalk',
      status: 'In Progress',
      assignment: 'Unassigned',
      location: 'Bandra West, Mumbai - 400050',
      description: 'The sidewalk near Linking Road has several broken slabs, posing danger to pedestrians. Someone fell and got injured last week.',
      contactNumber: '9876543216',
      email: 'vikram.singh@example.com'
    },
    {
      id: '1238',
      date: '24-04-2023',
      complainant: 'Neha Kapoor',
      issue: 'Stray dog menace',
      status: 'Pending',
      assignment: 'Unassigned',
      location: 'Goregaon East, Mumbai - 400063',
      description: 'A pack of stray dogs has been causing trouble in our residential area. They chase people and vehicles, creating safety concerns.',
      contactNumber: '9876543217',
      email: 'neha.kapoor@example.com'
    },
    {
      id: '1237',
      date: '23-04-2023',
      complainant: 'Rajesh Kumar',
      issue: 'Illegal construction',
      status: 'Closed',
      assignment: 'Unassigned',
      location: 'Kandivali West, Mumbai - 400067',
      description: 'An illegal shop extension is being constructed on the footpath, blocking pedestrian movement and causing congestion.',
      contactNumber: '9876543218',
      email: 'rajesh.kumar@example.com'
    },
    {
      id: '1236',
      date: '22-04-2023',
      complainant: 'Preeti Verma',
      issue: 'Road needs resurfacing',
      status: 'Pending',
      assignment: 'Unassigned',
      location: 'Powai, Mumbai - 400076',
      description: 'The road in front of Hiranandani Gardens has developed several potholes and needs urgent resurfacing before monsoon.',
      contactNumber: '9876543219',
      email: 'preeti.verma@example.com'
    },
    {
      id: '1235',
      date: '21-04-2023',
      complainant: 'Anil Sharma',
      issue: 'Damaged park bench',
      status: 'In Progress',
      assignment: 'Unassigned',
      location: 'Ghatkopar West, Mumbai - 400086',
      description: 'Several benches in the municipal park are broken and in dangerous condition. Senior citizens have no place to sit.',
      contactNumber: '9876543220',
      email: 'anil.sharma@example.com'
    },
    {
      id: '1234',
      date: '20-04-2023',
      complainant: 'Kavita Joshi',
      issue: 'Bus stop shelter damaged',
      status: 'Pending',
      assignment: 'Unassigned',
      location: 'Worli, Mumbai - 400018',
      description: 'The bus stop shelter near Worli Sea Face is damaged. The roof has holes and doesn\'t provide protection during rain.',
      contactNumber: '9876543221',
      email: 'kavita.joshi@example.com'
    },
    {
      id: '1233',
      date: '19-04-2023',
      complainant: 'Manish Gupta',
      issue: 'Broken traffic light',
      status: 'Resolved',
      assignment: 'Unassigned',
      location: 'Sion, Mumbai - 400022',
      description: 'The traffic light at Sion Circle junction isn\'t functioning. This is causing severe traffic jams during peak hours.',
      contactNumber: '9876543222',
      email: 'manish.gupta@example.com'
    },
    {
      id: '1232',
      date: '18-04-2023',
      complainant: 'Deepak Nair',
      issue: 'Tree fallen on road',
      status: 'Closed',
      assignment: 'Unassigned',
      location: 'Juhu, Mumbai - 400049',
      description: 'A large tree fell during yesterday\'s wind and is blocking half of the road near Juhu Beach. Needs urgent removal.',
      contactNumber: '9876543223',
      email: 'deepak.nair@example.com'
    },
    {
      id: '1231',
      date: '17-04-2023',
      complainant: 'Pooja Singh',
      issue: 'Water supply issue',
      status: 'In Progress',
      assignment: 'Unassigned',
      location: 'Mulund West, Mumbai - 400080',
      description: 'Our building has been facing irregular water supply for the past week. We get water for only 1 hour instead of the scheduled 3 hours.',
      contactNumber: '9876543224',
      email: 'pooja.singh@example.com'
    }
  ]);

  // Sample data for volunteers
  const volunteers = [
    { 
      id: 1, 
      name: 'Sanjay Kumar', 
      assignments: 0, 
      expertise: 'Road Infrastructure',
      availability: 'Full-time' 
    },
    { 
      id: 2, 
      name: 'Neha Gupta', 
      assignments: 0, 
      expertise: 'Traffic Management',
      availability: 'Part-time' 
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      assignments: 0, 
      expertise: 'Utility Services',
      availability: 'Full-time' 
    },
    { 
      id: 4, 
      name: 'Priya Sharma', 
      assignments: 2, 
      expertise: 'Environmental Issues',
      availability: 'Part-time' 
    },
    { 
      id: 5, 
      name: 'Rahul Verma', 
      assignments: 1, 
      expertise: 'Road Infrastructure',
      availability: 'Full-time' 
    },
  ];

  // Get complaints for current view (2 for preview or all for full view)
  const complaints = showAllComplaints 
    ? (filteredComplaints || complaintsData).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : (filteredComplaints || complaintsData).slice(0, 2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewAllComplaints = () => {
    setShowAllComplaints(true);
  };

  const handleShowLess = () => {
    setShowAllComplaints(false);
    setPage(0);
  };

  // Complaint detail modal handlers
  const handleOpenComplaintDetail = (complaint) => {
    setSelectedComplaint(complaint);
    setOpenModal(true);
  };

  const handleCloseComplaintDetail = () => {
    setOpenModal(false);
  };

  // Assign complaint modal handlers
  const handleOpenAssignModal = () => {
    setOpenAssignModal(true);
    setSelectedVolunteers([]);
    setDueDate('');
  };

  const handleCloseAssignModal = () => {
    setOpenAssignModal(false);
    setSelectedVolunteers([]);
    setDueDate('');
  };

  const handleSelectVolunteer = (volunteerId) => {
    // Toggle volunteer selection for multiple selection
    setSelectedVolunteers(prevSelected => {
      if (prevSelected.includes(volunteerId)) {
        return prevSelected.filter(id => id !== volunteerId);
      } else {
        return [...prevSelected, volunteerId];
      }
    });
  };

  const handleAssignComplaint = () => {
    if (!selectedComplaint || selectedVolunteers.length === 0 || !dueDate) return;

    // Get volunteer names for display
    const assignedVolunteerNames = selectedVolunteers.map(id => 
      volunteers.find(v => v.id === id)?.name
    ).filter(Boolean);

    // Create assignment text
    const assignmentText = assignedVolunteerNames.length > 0 
      ? assignedVolunteerNames.join(', ')
      : 'Unassigned';

    // Update the complaint in the complaints data
    setComplaintsData(prevComplaints => 
      prevComplaints.map(complaint => 
        complaint.id === selectedComplaint.id 
          ? { 
              ...complaint, 
              assignment: assignmentText,
              status: complaint.status === 'Pending' ? 'In Progress' : complaint.status,
              assignedTo: selectedVolunteers,
              dueDate: dueDate
            } 
          : complaint
      )
    );

    // Update volunteers' assignment counts
    selectedVolunteers.forEach(volunteerId => {
      const volunteerIndex = volunteers.findIndex(v => v.id === volunteerId);
      if (volunteerIndex !== -1) {
        volunteers[volunteerIndex].assignments += 1;
      }
    });

    // Show success message (could be enhanced with a toast notification)
    console.log(`Complaint #${selectedComplaint.id} assigned to ${assignmentText}. Due date: ${dueDate}`);
    
    // Close modals
    handleCloseAssignModal();
    handleCloseComplaintDetail();
  };

  // Update status modal handlers
  const handleOpenStatusModal = () => {
    setOpenStatusModal(true);
    setSelectedStatus(selectedComplaint?.status || '');
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
    setSelectedStatus('');
  };

  // Filter modal handlers
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };

  const handleFilterAssignmentChange = (event) => {
    setFilterAssignment(event.target.value);
  };

  const handleFilterVolunteerToggle = (volunteerId) => {
    setFilterVolunteers(prev => {
      if (prev.includes(volunteerId)) {
        return prev.filter(id => id !== volunteerId);
      } else {
        return [...prev, volunteerId];
      }
    });
  };

  const handleApplyFilter = () => {
    let filtered = [...complaintsData];
    
    // Filter by assignment status
    if (filterAssignment === 'assigned') {
      filtered = filtered.filter(complaint => complaint.assignment.toLowerCase() !== 'unassigned');
    } else if (filterAssignment === 'unassigned') {
      filtered = filtered.filter(complaint => complaint.assignment.toLowerCase() === 'unassigned');
    }
    
    // Filter by volunteer
    if (filterVolunteers.length > 0) {
      const volunteerNames = filterVolunteers.map(id => 
        volunteers.find(v => v.id === id)?.name
      ).filter(Boolean);
      
      filtered = filtered.filter(complaint => {
        if (complaint.assignment.toLowerCase() === 'unassigned') return false;
        
        // Check if any of the selected volunteers are assigned to this complaint
        return volunteerNames.some(name => complaint.assignment.includes(name));
      });
    }
    
    setFilteredComplaints(filtered);
    setPage(0);
    handleCloseFilterModal();
  };

  const handleClearFilter = () => {
    setFilterAssignment('all');
    setFilterVolunteers([]);
    setFilteredComplaints(null);
    handleCloseFilterModal();
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    if (!selectedComplaint || !selectedStatus) return;

    // Update the complaint status in the complaints data
    setComplaintsData(prevComplaints => 
      prevComplaints.map(complaint => 
        complaint.id === selectedComplaint.id 
          ? { 
              ...complaint, 
              status: selectedStatus
            } 
          : complaint
      )
    );

    // Also update the selectedComplaint to reflect the change in the details modal
    setSelectedComplaint({
      ...selectedComplaint,
      status: selectedStatus
    });

    // Close the status modal
    handleCloseStatusModal();
  };

  const handleToggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedVolunteers = [...volunteers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.assignments - b.assignments;
    } else {
      return b.assignments - a.assignments;
    }
  });

  const getExpertiseChipColor = (expertise) => {
    switch (expertise) {
      case 'Road Infrastructure':
        return '#FFA500';
      case 'Traffic Management':
        return '#FF6B6B';
      case 'Utility Services':
        return '#4CAF50';
      case 'Environmental Issues':
        return '#3f51b5';
      default:
        return '#FFD700';
    }
  };

  const getAvailabilityChipColor = (availability) => {
    return availability === 'Full-time' ? '#4CAF50' : '#FFA500';
  };

  const stats = [
    { label: 'Total Complaints', value: complaintsData.length.toString(), icon: <ChatIcon />, color: '#FFD700' },
    { label: 'Pending', value: complaintsData.filter(c => c.status === 'Pending').length.toString(), icon: <PendingIcon />, color: '#FFD700' },
    { label: 'In Progress', value: complaintsData.filter(c => c.status === 'In Progress').length.toString(), icon: <HourglassEmptyIcon />, color: '#FFA500' },
    { label: 'Resolved', value: complaintsData.filter(c => c.status === 'Resolved').length.toString(), icon: <CheckCircleIcon />, color: '#4CAF50' },
    { label: 'Unassigned', value: complaintsData.filter(c => c.assignment.toLowerCase() === 'unassigned').length.toString(), icon: <GroupIcon />, color: '#FF6B6B' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFD700';
      case 'in progress':
        return '#FFA500';
      case 'resolved':
        return '#4CAF50';
      case 'closed':
        return '#999999';
      default:
        return '#FFD700';
    }
  };

  const getAssignmentColor = (assignment) => {
    return assignment.toLowerCase() === 'unassigned' ? '#FF6B6B' : '#4CAF50';
  };

  // Function to get assignment display text
  const getAssignmentDisplayText = (assignment) => {
    return assignment.toLowerCase() === 'unassigned' ? 'Unassigned' : 'Assigned';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      pt: 5, 
      pb: 8,
      px: 2,
      background: 'linear-gradient(135deg, #FFFFF5 0%, #F8F9FA 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0) 100%)',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 }, position: 'relative', zIndex: 1 }}>
        {/* Dashboard Header */}
        <Box sx={{ 
          mb: 6, 
          textAlign: 'center',
          position: 'relative',
          py: 3,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, rgba(255,215,0,0.5) 0%, rgba(255,215,0,1) 50%, rgba(255,215,0,0.5) 100%)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(255,215,0,0.2)'
          }
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              color: '#1A1A1A',
              mb: 2,
              fontSize: { xs: '2.2rem', sm: '2.7rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.06)',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(120deg, #111 30%, #444 70%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Admin Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555',
              maxWidth: '650px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.5,
              fontWeight: 400,
              px: { xs: 2, sm: 4 },
              position: 'relative',
              '&::before': {
                content: '""',
                display: 'block',
                width: '30px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255,215,0,0) 0%, rgba(255,215,0,1) 100%)',
                position: 'absolute',
                top: '50%',
                left: { xs: '10px', sm: '20px' }
              },
              '&::after': {
                content: '""',
                display: 'block',
                width: '30px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(255,215,0,1) 0%, rgba(255,215,0,0) 100%)',
                position: 'absolute',
                top: '50%',
                right: { xs: '10px', sm: '20px' }
              }
            }}
          >
            Welcome to the JFGR Admin Dashboard. Manage complaints, assign volunteers and track progress.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mb: 5,
          '&:hover > .MuiPaper-root': {
            opacity: 0.85,
            transform: 'translateY(0)'
          }
        }}>
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                flex: '1 1 0%',
                minWidth: { xs: '100%', sm: 180 },
                p: 2.5,
                pt: 2.5,
                pb: 2.5,
                bgcolor: 'white',
                borderRadius: 4,
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, opacity 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-3px) !important',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  opacity: '1 !important',
                  zIndex: 2
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: stat.color
                },
                '@media (max-width: 600px)': {
                  '&:not(:first-of-type)': {
                    mt: 1
                  }
                }
              }}
              className="stat-card"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 38,
                    height: 38,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${stat.color}15`,
                    mr: 1.5,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: '1.3rem' } })}
                </Box>
                <Typography variant="body1" sx={{ color: '#666', fontWeight: 500, fontSize: '0.95rem' }}>
                  {stat.label}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold', 
                color: '#1A1A1A', 
                fontSize: '2.2rem', 
                lineHeight: 1.1, 
                ml: 0.5,
                textShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}>
                {stat.value}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* View All Complaints Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)',
            mb: 4,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
            }
          }}
        >
          {/* Section Header with Underline */}
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            background: 'linear-gradient(90deg, #FFFFFF 0%, #FAFAFA 100%)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', position: 'relative', display: 'inline-block' }}>
              View All Complaints
              <Box sx={{ 
                position: 'absolute', 
                bottom: -12, 
                left: 0, 
                width: 60, 
                height: 4, 
                bgcolor: '#FFD700',
                borderRadius: 4
              }} />
            </Typography>
          </Box>

          {/* Alert Banner */}
          <Box 
            sx={{ 
              background: 'linear-gradient(90deg, #FFF9E6 0%, #FFF5D6 100%)',
              p: 3, 
              mx: 3,
              my: 3,
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              boxShadow: '0 2px 8px rgba(255, 215, 0, 0.05)',
            }}
          >
            <Typography sx={{ color: '#805B10', fontWeight: '500', fontSize: '0.95rem' }}>
              You have {complaintsData.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length} active complaints to address.
            </Typography>
            <Button
              startIcon={<FilterListIcon />}
              onClick={handleOpenFilterModal}
              sx={{
                color: '#1A1A1A',
                bgcolor: filteredComplaints ? 'rgba(255, 215, 0, 0.1)' : 'white',
                border: filteredComplaints ? '1px solid #FFD700' : '1px solid rgba(0,0,0,0.05)',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 3,
                px: 2,
                boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                '&:hover': {
                  bgcolor: filteredComplaints ? 'rgba(255, 215, 0, 0.15)' : 'white',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s'
              }}
            >
              {filteredComplaints ? 'Filtered' : 'Filter'}
            </Button>
          </Box>

          {/* Complaints Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8f8f8' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>Complainant</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>Issue</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#444' }}>Assignment</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#444' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow 
                    key={complaint.id}
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'rgba(255, 215, 0, 0.03)' 
                      },
                      transition: 'background-color 0.3s',
                      cursor: 'pointer',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '1px',
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                    onClick={() => handleOpenComplaintDetail(complaint)}
                  >
                    <TableCell sx={{ fontWeight: 'medium', color: '#333' }}>#{complaint.id}</TableCell>
                    <TableCell sx={{ color: '#555' }}>{complaint.date}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium', color: '#333' }}>{complaint.complainant}</TableCell>
                    <TableCell sx={{ 
                      color: '#444',
                      maxWidth: '250px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {complaint.issue}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        sx={{
                          bgcolor: `${getStatusColor(complaint.status)}15`,
                          color: getStatusColor(complaint.status),
                          fontWeight: 500,
                          borderRadius: 3,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          '&:hover': {
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                          },
                          transition: 'all 0.2s'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getAssignmentDisplayText(complaint.assignment)}
                        sx={{
                          bgcolor: `${getAssignmentColor(complaint.assignment)}15`,
                          color: getAssignmentColor(complaint.assignment),
                          fontWeight: 500,
                          borderRadius: 3,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          '&:hover': {
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                          },
                          transition: 'all 0.2s'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenComplaintDetail(complaint);
                        }}
                        sx={{
                          bgcolor: '#FFD700',
                          color: '#1A1A1A',
                          '&:hover': {
                            bgcolor: '#E6C200',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          },
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          borderRadius: 3,
                          transition: 'all 0.2s'
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination for full view */}
          {showAllComplaints && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              p: 2, 
              borderTop: '1px solid rgba(0,0,0,0.05)',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #FAFAFA 100%)'
            }}>
              <Button
                variant="outlined"
                onClick={handleShowLess}
                sx={{
                  color: '#1A1A1A',
                  borderColor: 'rgba(0,0,0,0.1)',
                  '&:hover': {
                    borderColor: 'rgba(0,0,0,0.2)',
                    bgcolor: 'rgba(0,0,0,0.01)',
                    transform: 'translateY(-1px)'
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 3,
                  transition: 'all 0.2s'
                }}
              >
                Show Less
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  disabled={page === 0}
                  onClick={() => handleChangePage(null, page - 1)}
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1,
                    mx: 0.5,
                    color: page === 0 ? 'rgba(0,0,0,0.3)' : '#1A1A1A',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.03)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <KeyboardArrowLeftIcon />
                </Button>
                <Typography sx={{ mx: 2, color: '#666', fontWeight: 500 }}>
                  Page {page + 1} of {Math.ceil(complaintsData.length / rowsPerPage)}
                </Typography>
                <Button 
                  disabled={page >= Math.ceil(complaintsData.length / rowsPerPage) - 1}
                  onClick={() => handleChangePage(null, page + 1)}
                  sx={{ 
                    minWidth: 'auto', 
                    p: 1,
                    mx: 0.5,
                    color: page >= Math.ceil(complaintsData.length / rowsPerPage) - 1 ? 'rgba(0,0,0,0.3)' : '#1A1A1A',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.03)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <KeyboardArrowRightIcon />
                </Button>
              </Box>
            </Box>
          )}

          {/* Button Center - Only show in preview mode */}
          {!showAllComplaints && (
            <Box sx={{ 
              p: 3, 
              display: 'flex', 
              justifyContent: 'center',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #FAFAFA 100%)',
              borderTop: '1px solid rgba(0,0,0,0.05)'
            }}>
              <Button
                variant="contained"
                onClick={handleViewAllComplaints}
                sx={{
                  bgcolor: '#FFD700',
                  color: '#1A1A1A',
                  '&:hover': {
                    bgcolor: '#E6C200',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 2px 5px rgba(255, 215, 0, 0.3)',
                  px: 4,
                  py: 1.2,
                  borderRadius: 3,
                  transition: 'all 0.3s'
                }}
              >
                View All Complaints
              </Button>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Complaint Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseComplaintDetail}
        aria-labelledby="complaint-details-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          p: 0,
          width: '100%',
          maxWidth: 700,
          maxHeight: '90vh',
          overflow: 'auto',
          transform: openModal ? 'translateY(0)' : 'translateY(20px)',
          opacity: openModal ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s'
        }}>
          {selectedComplaint && (
            <>
              {/* Modal Header */}
              <Box sx={{ 
                position: 'relative',
                pb: 0.5,
                pt: 3,
                px: 3,
                background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 245, 0) 100%)'
              }}>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseComplaintDetail}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'grey.500',
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.08)',
                      transform: 'rotate(90deg)'
                    },
                    transition: 'transform 0.3s'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', pb: 1 }}>
                  Complaint Details
                </Typography>
                <Box sx={{ 
                  width: 120, 
                  height: 4, 
                  bgcolor: '#FFD700', 
                  mt: 0,
                  mb: 2,
                  borderRadius: 2
                }} />
              </Box>

              {/* Complaint Information */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Complaint ID:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000', fontWeight: 600 }}>
                    #{selectedComplaint.id}
                  </Typography>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Date Filed:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    {selectedComplaint.date}
                  </Typography>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Complainant:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000', fontWeight: 500 }}>
                    {selectedComplaint.complainant}
                  </Typography>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Issue:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    {selectedComplaint.issue}
                  </Typography>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Status:
                  </Typography>
                  <Chip
                    label={selectedComplaint.status}
                    sx={{
                      bgcolor: `${getStatusColor(selectedComplaint.status)}15`,
                      color: getStatusColor(selectedComplaint.status),
                      fontWeight: 500,
                      borderRadius: 1.5,
                      height: 28,
                      fontSize: '0.85rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                  />
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Assignment:
                  </Typography>
                  <Box>
                    <Chip
                      label={getAssignmentDisplayText(selectedComplaint.assignment)}
                      sx={{
                        bgcolor: `${getAssignmentColor(selectedComplaint.assignment)}15`,
                        color: getAssignmentColor(selectedComplaint.assignment),
                        fontWeight: 500,
                        borderRadius: 1.5,
                        height: 28,
                        fontSize: '0.85rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                    />
                    {selectedComplaint.assignment.toLowerCase() !== 'unassigned' && (
                      <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                        Assigned to: <Typography component="span" sx={{ fontWeight: 500, color: '#000' }}>{selectedComplaint.assignment}</Typography>
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Location:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    {selectedComplaint.location || 'Not specified'}
                  </Typography>
                </Box>

                <Box sx={{ py: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, mb: 1.5 }}>
                    Description:
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      bgcolor: '#FFFFF5',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      boxShadow: '0 2px 8px rgba(255, 215, 0, 0.05)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255, 215, 0, 0.08)'
                      }
                    }}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {selectedComplaint.description || 'No description provided.'}
                    </Typography>
                  </Paper>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  mt: 1.5
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Contact Number:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    {selectedComplaint.contactNumber || 'Not provided'}
                  </Typography>
                </Box>

                <Box sx={{ 
                  py: 2, 
                  display: 'flex',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}>
                  <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500, width: 150 }}>
                    Email:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    {selectedComplaint.email || 'Not provided'}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenStatusModal}
                    sx={{
                      bgcolor: 'rgba(255, 215, 0, 0.08)',
                      color: '#1A1A1A',
                      border: '1px solid #FFD700',
                      '&:hover': {
                        bgcolor: 'rgba(255, 215, 0, 0.16)',
                        border: '1px solid #FFD700',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    Update Status
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleOpenAssignModal}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1A1A1A',
                      '&:hover': {
                        bgcolor: '#E6C200',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                  >
                    Assign Complaint
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Assign Complaint Modal */}
      <Modal
        open={openAssignModal}
        onClose={handleCloseAssignModal}
        aria-labelledby="assign-complaint-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          p: 0,
          width: '100%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflow: 'auto',
          transform: openAssignModal ? 'translateY(0)' : 'translateY(20px)',
          opacity: openAssignModal ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s'
        }}>
          {selectedComplaint && (
            <>
              {/* Modal Header */}
              <Box sx={{ 
                position: 'relative',
                pb: 0.5,
                pt: 3,
                px: 3,
                background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 245, 0) 100%)'
              }}>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseAssignModal}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'grey.500',
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.08)',
                      transform: 'rotate(90deg)'
                    },
                    transition: 'transform 0.3s'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', pb: 1 }}>
                  Assign Complaint
                </Typography>
                <Box sx={{ 
                  width: 120, 
                  height: 4, 
                  bgcolor: '#FFD700', 
                  mt: 0,
                  mb: 2,
                  borderRadius: 2
                }} />
              </Box>

              {/* Complaint Identifier */}
              <Box sx={{ 
                px: 3, 
                pb: 2, 
                mb: 2, 
                bgcolor: '#f9f9f9', 
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <Typography variant="body1" sx={{ py: 2, color: '#555' }}>
                  Complaint ID: <strong>#{selectedComplaint.id}</strong> - {selectedComplaint.issue}
                </Typography>
              </Box>

              {/* Volunteer Selection */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2 
                }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Select Volunteers:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                      You can select multiple volunteers for this complaint
                    </Typography>
                  </Box>
                  <Button 
                    startIcon={<SortIcon />}
                    onClick={handleToggleSort}
                    sx={{
                      color: '#1A1A1A',
                      bgcolor: 'white',
                      border: '1px solid rgba(0,0,0,0.08)',
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      fontSize: '0.85rem',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.01)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    Sort by Assignments {sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </Box>

                {/* Selected volunteers summary */}
                {selectedVolunteers.length > 0 && (
                  <Box sx={{ 
                    mb: 2, 
                    p: 2.5, 
                    bgcolor: 'rgba(255, 215, 0, 0.08)', 
                    borderRadius: 3, 
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.05)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      Selected volunteers ({selectedVolunteers.length}):
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedVolunteers.map(id => {
                        const volunteer = volunteers.find(v => v.id === id);
                        return volunteer ? (
                          <Chip 
                            key={id}
                            label={volunteer.name}
                            size="small"
                            onDelete={() => handleSelectVolunteer(id)}
                            sx={{
                              bgcolor: 'white',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              fontWeight: 500,
                              '&:hover': {
                                bgcolor: 'white',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                              },
                              transition: 'box-shadow 0.2s'
                            }}
                          />
                        ) : null;
                      })}
                    </Box>
                  </Box>
                )}

                <Box 
                  sx={{ 
                    maxHeight: 300, 
                    overflowY: 'auto',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    mb: 3,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                  }}
                >
                  {sortedVolunteers.map((volunteer) => (
                    <Box 
                      key={volunteer.id}
                      sx={{ 
                        p: 2, 
                        borderBottom: volunteer.id !== sortedVolunteers[sortedVolunteers.length - 1].id ? '1px solid rgba(0,0,0,0.08)' : 'none',
                        bgcolor: selectedVolunteers.includes(volunteer.id) ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
                        '&:hover': {
                          bgcolor: selectedVolunteers.includes(volunteer.id) ? 'rgba(255, 215, 0, 0.08)' : 'rgba(0,0,0,0.01)'
                        },
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'background-color 0.2s, transform 0.2s',
                        '&:hover': {
                          transform: 'translateX(2px)'
                        }
                      }}
                    >
                      <Checkbox 
                        checked={selectedVolunteers.includes(volunteer.id)}
                        onChange={() => handleSelectVolunteer(volunteer.id)}
                        sx={{ 
                          mr: 1,
                          color: '#FFD700',
                          '&.Mui-checked': {
                            color: '#FFD700',
                          },
                          padding: '4px',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                      <Box 
                        sx={{ 
                          flexGrow: 1, 
                          cursor: 'pointer',
                          py: 0.5
                        }}
                        onClick={() => handleSelectVolunteer(volunteer.id)}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {volunteer.name} 
                          <Typography component="span" variant="body2" sx={{ ml: 1, color: '#666' }}>
                            ({volunteer.assignments} assignments)
                          </Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 1, gap: 1 }}>
                          <Chip 
                            label={volunteer.expertise}
                            size="small"
                            sx={{
                              bgcolor: `${getExpertiseChipColor(volunteer.expertise)}15`,
                              color: getExpertiseChipColor(volunteer.expertise),
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 24,
                              borderRadius: 1,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                          />
                          <Chip 
                            label={volunteer.availability}
                            size="small"
                            sx={{
                              bgcolor: `${getAvailabilityChipColor(volunteer.availability)}15`,
                              color: getAvailabilityChipColor(volunteer.availability),
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 24,
                              borderRadius: 1,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Due Date */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Set Due Date:
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ color: '#666', fontSize: '1.2rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                        }
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0,0,0,0.1)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0,0,0,0.2)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFD700'
                      }
                    }}
                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCloseAssignModal}
                    sx={{
                      color: '#1A1A1A',
                      borderColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        borderColor: 'rgba(0,0,0,0.5)',
                        bgcolor: 'rgba(0,0,0,0.01)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                      },
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 3,
                      px: 3,
                      transition: 'all 0.2s'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAssignComplaint}
                    disabled={selectedVolunteers.length === 0 || !dueDate}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1A1A1A',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      '&:hover': {
                        bgcolor: '#E6C200',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'rgba(255, 215, 0, 0.3)',
                        color: 'rgba(0, 0, 0, 0.4)'
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 3,
                      px: 3,
                      transition: 'all 0.2s'
                    }}
                  >
                    Assign Complaint
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Update Status Modal */}
      <Modal
        open={openStatusModal}
        onClose={handleCloseStatusModal}
        aria-labelledby="update-status-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          p: 0,
          width: '100%',
          maxWidth: 500,
          overflow: 'hidden',
          transform: openStatusModal ? 'translateY(0)' : 'translateY(20px)',
          opacity: openStatusModal ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s'
        }}>
          {selectedComplaint && (
            <>
              {/* Modal Header */}
              <Box sx={{ 
                position: 'relative',
                pb: 0.5,
                pt: 3,
                px: 3,
                background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 245, 0) 100%)'
              }}>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseStatusModal}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'grey.500',
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.08)',
                      transform: 'rotate(90deg)'
                    },
                    transition: 'transform 0.3s'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', pb: 1 }}>
                  Update Status
                </Typography>
                <Box sx={{ 
                  width: 120, 
                  height: 4, 
                  bgcolor: '#FFD700', 
                  mt: 0,
                  mb: 2,
                  borderRadius: 2
                }} />
              </Box>

              {/* Complaint Identifier */}
              <Box sx={{ 
                px: 3, 
                pb: 2, 
                mb: 2, 
                bgcolor: '#f9f9f9', 
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <Typography variant="body1" sx={{ py: 2, color: '#555' }}>
                  Complaint ID: <strong>#{selectedComplaint.id}</strong> - {selectedComplaint.issue}
                </Typography>
              </Box>

              {/* Status Selection */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Select New Status:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0,0,0,0.1)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0,0,0,0.2)'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFD700'
                        },
                        borderRadius: 3,
                        mb: 2,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
                        }
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip
                            label={selected}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(selected)}15`,
                              color: getStatusColor(selected),
                              fontWeight: 500,
                              borderRadius: 1.5,
                              fontSize: '0.85rem',
                              height: 28,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                            }}
                          />
                        </Box>
                      )}
                    >
                      <MenuItem value="Pending">
                        <Chip
                          label="Pending"
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor('Pending')}15`,
                            color: getStatusColor('Pending'),
                            fontWeight: 500,
                            borderRadius: 1.5,
                            fontSize: '0.85rem',
                            height: 28
                          }}
                        />
                      </MenuItem>
                      <MenuItem value="In Progress">
                        <Chip
                          label="In Progress"
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor('In Progress')}15`,
                            color: getStatusColor('In Progress'),
                            fontWeight: 500,
                            borderRadius: 1.5,
                            fontSize: '0.85rem',
                            height: 28
                          }}
                        />
                      </MenuItem>
                      <MenuItem value="Resolved">
                        <Chip
                          label="Resolved"
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor('Resolved')}15`,
                            color: getStatusColor('Resolved'),
                            fontWeight: 500,
                            borderRadius: 1.5,
                            fontSize: '0.85rem',
                            height: 28
                          }}
                        />
                      </MenuItem>
                      <MenuItem value="Closed">
                        <Chip
                          label="Closed"
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor('Closed')}15`,
                            color: getStatusColor('Closed'),
                            fontWeight: 500,
                            borderRadius: 1.5,
                            fontSize: '0.85rem',
                            height: 28
                          }}
                        />
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                    Current Status: 
                    <Chip
                      label={selectedComplaint.status}
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: `${getStatusColor(selectedComplaint.status)}15`,
                        color: getStatusColor(selectedComplaint.status),
                        fontWeight: 500,
                        borderRadius: 1.5,
                        fontSize: '0.75rem',
                        height: 24,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    />
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCloseStatusModal}
                    sx={{
                      color: '#1A1A1A',
                      borderColor: 'rgba(0,0,0,0.2)',
                      '&:hover': {
                        borderColor: 'rgba(0,0,0,0.5)',
                        bgcolor: 'rgba(0,0,0,0.01)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                      },
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 3,
                      px: 3,
                      transition: 'all 0.2s'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleUpdateStatus}
                    disabled={!selectedStatus || selectedStatus === selectedComplaint.status}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1A1A1A',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      '&:hover': {
                        bgcolor: '#E6C200',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'rgba(255, 215, 0, 0.3)',
                        color: 'rgba(0, 0, 0, 0.4)'
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: 3,
                      px: 3,
                      transition: 'all 0.2s'
                    }}
                  >
                    Update Status
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Filter Modal */}
      <Modal
        open={openFilterModal}
        onClose={handleCloseFilterModal}
        aria-labelledby="filter-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          p: 0,
          width: '100%',
          maxWidth: 550,
          overflow: 'hidden',
          transform: openFilterModal ? 'translateY(0)' : 'translateY(20px)',
          opacity: openFilterModal ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s'
        }}>
          {/* Modal Header */}
          <Box sx={{ 
            position: 'relative',
            pb: 0.5,
            pt: 3,
            px: 3,
            background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 255, 245, 0) 100%)'
          }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseFilterModal}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'grey.500',
                bgcolor: 'rgba(0,0,0,0.03)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.08)',
                  transform: 'rotate(90deg)'
                },
                transition: 'transform 0.3s'
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', pb: 1 }}>
              Filter Complaints
            </Typography>
            <Box sx={{ 
              width: 120, 
              height: 4, 
              bgcolor: '#FFD700', 
              mt: 0,
              mb: 2,
              borderRadius: 2
            }} />
          </Box>

          <Box sx={{ px: 3, pb: 3 }}>
            {/* Assignment Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Filter by Assignment:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={filterAssignment}
                  onChange={handleFilterAssignmentChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0,0,0,0.1)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0,0,0,0.2)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD700'
                    },
                    borderRadius: 2,
                    mb: 1,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                  }}
                >
                  <MenuItem value="all">All Complaints</MenuItem>
                  <MenuItem value="assigned">Assigned Complaints</MenuItem>
                  <MenuItem value="unassigned">Unassigned Complaints</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Select to view all complaints, only assigned, or only unassigned complaints
              </Typography>
            </Box>

            {/* Volunteer Filter */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2 
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Filter by Volunteer:
                </Typography>
              </Box>
              
              {/* Selected volunteers summary */}
              {filterVolunteers.length > 0 && (
                <Box sx={{ 
                  mb: 2, 
                  p: 2.5, 
                  bgcolor: 'rgba(255, 215, 0, 0.08)', 
                  borderRadius: 3, 
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  boxShadow: '0 2px 8px rgba(255, 215, 0, 0.05)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Selected filters ({filterVolunteers.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {filterVolunteers.map(id => {
                      const volunteer = volunteers.find(v => v.id === id);
                      return volunteer ? (
                        <Chip 
                          key={id}
                          label={volunteer.name}
                          size="small"
                          onDelete={() => handleFilterVolunteerToggle(id)}
                          sx={{
                            bgcolor: 'white',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: 'white',
                            }
                          }}
                        />
                      ) : null;
                    })}
                  </Box>
                </Box>
              )}

              <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1.5 }}>
                Only applicable to assigned complaints. Select one or more volunteers to filter by.
              </Typography>
              
              <Box 
                sx={{ 
                  maxHeight: 200, 
                  overflowY: 'auto',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 3,
                  mb: 1,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                }}
              >
                {volunteers.map((volunteer) => (
                  <Box 
                    key={volunteer.id}
                    sx={{ 
                      p: 1.5, 
                      borderBottom: volunteer.id !== volunteers[volunteers.length - 1].id ? '1px solid rgba(0,0,0,0.08)' : 'none',
                      bgcolor: filterVolunteers.includes(volunteer.id) ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
                      '&:hover': {
                        bgcolor: filterVolunteers.includes(volunteer.id) ? 'rgba(255, 215, 0, 0.08)' : 'rgba(0,0,0,0.01)'
                      },
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <Checkbox 
                      checked={filterVolunteers.includes(volunteer.id)}
                      onChange={() => handleFilterVolunteerToggle(volunteer.id)}
                      disabled={filterAssignment === 'unassigned'}
                      sx={{ 
                        mr: 1,
                        color: '#FFD700',
                        '&.Mui-checked': {
                          color: '#FFD700',
                        },
                        padding: '3px',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {volunteer.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleClearFilter}
                sx={{
                  color: '#1A1A1A',
                  borderColor: 'rgba(0,0,0,0.2)',
                  '&:hover': {
                    borderColor: 'rgba(0,0,0,0.5)',
                    bgcolor: 'rgba(0,0,0,0.01)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.2s'
                }}
              >
                Clear Filters
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilter}
                sx={{
                  bgcolor: '#FFD700',
                  color: '#1A1A1A',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: '#E6C200',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                  transition: 'all 0.2s'
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard; 