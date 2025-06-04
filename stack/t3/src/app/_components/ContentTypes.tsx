import { type ModelName, type ModelType } from "~/types/types"
import { Card, CardContent, CardHeader, Typography, Chip, Box, Avatar } from "@mui/material"
import { format } from "date-fns"
import { 
  Science as DrugIcon,
  Warning as SideEffectIcon,
  LocalHospital as TrialIcon,
  Business as ManufacturerIcon,
  Person as UserIcon,
  CompareArrows as ComparisonIcon,
  ReportProblem as DrugEffectIcon
} from "@mui/icons-material"
import { Actions } from "./Actions"

// Helper function to format dates
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d, yyyy")
}

// Helper function to get severity color
export const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "mild":
      return "success"
    case "medium":
      return "warning"
    case "severe":
      return "error"
    case "fatal":
      return "error"
    default:
      return "default"
  }
}

// Helper function to get trial phase color
export const getTrialPhaseColor = (phase: string) => {
  switch (phase) {
    case "phase_1":
      return "info"
    case "phase_2":
      return "warning"
    case "phase_3":
      return "success"
    case "phase_4":
      return "secondary"
    default:
      return "default"
  }
}

// Helper function to get trial status color
export const getTrialStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return "info"
    case "completed":
      return "success"
    case "suspended":
      return "warning"
    case "terminated":
      return "error"
    default:
      return "default"
  }
}

interface CardWrapperProps<T extends ModelName> {
  item: ModelType<T>
  showDetails?: boolean
}

const DrugCard = ({ item, showDetails = false }: CardWrapperProps<"Drugs">) => {
  if (showDetails) {
    return <DrugDetails item={item} />
  }
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><DrugIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.name}
        subheader={
          item.manufacturer && (
            <Typography variant="body2">
              Manufacturer: {item.manufacturer.str}
            </Typography>
          )
        }
      />
      <CardContent>
        {item.description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.description}
          </Typography>
        )}
        <Box sx={{ display: "grid", gap: 2 }}>          
        <Chip
            size="small"
            label={item.approval_status}
            color={item.approval_status === "approved" ? "success" : "warning"}
          />
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {item.target_cost && (
              <Typography variant="body2">
                Target Cost: ${Intl.NumberFormat('en-US').format(item.target_cost)}
              </Typography>
            )}
            {item.full_treatment_duration && (
              <Typography variant="body2">
                Duration: {item.full_treatment_duration}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const DrugDetails = ({ item }: CardWrapperProps<"Drugs">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><DrugIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.name}
        subheader={
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            {item.manufacturer && (
              <Typography variant="body2">
                Manufacturer: {item.manufacturer.str}
              </Typography>
            )}
            <Typography variant="body2">
              Created: {formatDate(item.created_at)}
            </Typography>
            <Typography variant="body2">
              Last Modified: {formatDate(item.modified_at)}
            </Typography>
            {item.author && (
              <Typography variant="body2">
                Author: {item.author.str}
              </Typography>
            )}
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "grid", gap: 2 }}>
          {item.description && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item.description}
            </Typography>
          )}
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              size="small"
              label={item.approval_status}
              color={item.approval_status === "approved" ? "success" : "warning"}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {item.target_cost && (
              <Typography variant="body2">
                Target Cost: ${Intl.NumberFormat('en-US').format(item.target_cost)}
              </Typography>
            )}
            {item.full_treatment_duration && (
              <Typography variant="body2">
                Treatment Duration: {item.full_treatment_duration}
              </Typography>
            )}
          </Box>

          {item.side_effects_to_type_reference && item.side_effects_to_type_reference.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Related Side Effects & Trials:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {item.side_effects_to_type_reference.map((ref, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={ref.str}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

const SideEffectCard = ({ item }: CardWrapperProps<"SideEffects">) => {
  return (
  <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><SideEffectIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.name}
      />
    </Card>
  )
}

const DrugEffectCard = ({ item }: CardWrapperProps<"DrugEffects">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><DrugEffectIcon /></Avatar>}
        action={<Actions item={item} />}
        title={`${item.reported_count} cases of ${item.severity} ${item.side_effect?.str}`}
        subheader={
          <Chip
            size="small"
            label={item.severity}
            color={getSeverityColor(item.severity) as any}
          />
        }
      />
      <CardContent>
        <Typography variant="body2">
          Reported Count: {item.reported_count}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ManufacturerCard = ({ item }: CardWrapperProps<"Manufacturers">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><ManufacturerIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.name}
      />
      <CardContent>
        {item.location && (
          <Typography variant="body2" gutterBottom>
            Location: {item.location}
          </Typography>
        )}
        {item.contact_info && (
          <Typography variant="body2">
            Contact: {item.contact_info}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

const TrialCard = ({ item }: CardWrapperProps<"Trials">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><TrialIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.title}
        subheader={
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Chip
              size="small"
              label={item.trial_phase.replace("_", " ")}
              color={getTrialPhaseColor(item.trial_phase) as any}
            />
            <Chip
              size="small"
              label={item.status}
              color={getTrialStatusColor(item.status) as any}
            />
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography variant="body2">
            Drug: {item.drug?.str}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Typography variant="body2">
              Sample Size: {item.sample_size}
            </Typography>
            <Typography variant="body2">
              Duration: {item.study_duration}
            </Typography>
          </Box>
          {item.success_rate !== undefined && item.success_rate !== null && (
            <Typography variant="body2">
              Success Rate: {(item.success_rate * 100).toFixed(1)}%
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

const DrugComparisonCard = ({ item }: CardWrapperProps<"DrugComparisons">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><ComparisonIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.title}
        subheader={item.drugs.map(drug => drug.str).join(', ')}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom component={'pre'}>
          Criteria: {JSON.stringify(item.comparison_criteria, ' ', 2)}
        </Typography>
        {item.expires && (
          <Typography variant="body2" color="text.secondary">
            Expires: {formatDate(item.expires)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

const UserCard = ({ item }: CardWrapperProps<"Users">) => {
  return (
    <Card aria-label={`${item._type} Card`}>
      <CardHeader
        avatar={<Avatar><UserIcon /></Avatar>}
        action={<Actions item={item} />}
        title={item.username || item.email}
        subheader={`${item.first_name} ${item.last_name}`}
      />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Phone: {item.phone}
        </Typography>
        {item.last_login && (
          <Typography variant="body2" color="text.secondary">
            Last Login: {formatDate(item.last_login)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export const CardWrapper = <T extends ModelName>({ item, showDetails = false }: CardWrapperProps<T>) => {
  const cardProps = { item, showDetails }

  switch (item._type) {
    case "Drugs":
      return <DrugCard {...cardProps as CardWrapperProps<"Drugs">} />
    case "SideEffects":
      return <SideEffectCard {...cardProps as CardWrapperProps<"SideEffects">} />
    case "DrugEffects":
      return <DrugEffectCard {...cardProps as CardWrapperProps<"DrugEffects">} />
    case "Manufacturers":
      return <ManufacturerCard {...cardProps as CardWrapperProps<"Manufacturers">} />
    case "Trials":
      return <TrialCard {...cardProps as CardWrapperProps<"Trials">} />
    case "DrugComparisons":
      return <DrugComparisonCard {...cardProps as CardWrapperProps<"DrugComparisons">} />
    case "Users":
      return <UserCard {...cardProps as CardWrapperProps<"Users">} />
    default:
      return (
        <Card>
          <CardContent>
            <Typography>Unknown content type: {item._type}</Typography>
          </CardContent>
        </Card>
      )
  }
} 