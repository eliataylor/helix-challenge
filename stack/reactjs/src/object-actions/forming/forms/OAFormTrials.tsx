//---OBJECT-ACTIONS-OAFORM-STARTS---//
import React from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { TypeFieldSchema } from "../../types/types";
import { OAFormProps, useForm } from "../FormProvider";
import { useSnackbar } from "notistack";
import { AlternatingList } from "../../../theme/StyledFields";
import { useNavigate } from "react-router-dom";

export const OAFormTrials: React.FC<OAFormProps<"Trials">> = ({ onSuccess }) => {

  const { renderField, handleSubmit, handleDelete, errors, navItem, entity, syncing } = useForm<"Trials">();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function saveEntity() {
    handleSubmit().then((newentity) => {
      if (onSuccess) {
        onSuccess(newentity);
      } else {
        navigate(`/${navItem.segment}/${newentity.id}`);
      }
      enqueueSnackbar(`Trials saved`);
    }).catch(error => {
      console.error(error);
      enqueueSnackbar("Save failed");
    });
  }

  function deleteEntity() {
    handleDelete().then((msg) => {
      enqueueSnackbar(`Trials saved`);
    }).catch(error => {
      console.error(error);
      enqueueSnackbar("Delete failed");
    });
  }

  return (
    <AlternatingList container spacing={4} p={1} justifyContent={'space-between'} wrap={"wrap"} >
      			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["title"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["drug"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["sample_size"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["study_design"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["study_duration"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["health_status"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["external_factors"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["age_range"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["bias"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["bias_score"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["blinding"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["status"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["trial_phase"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["pros"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["clinros"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["performance_outcomes"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["composite_score"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["complexity_score"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["success_rate"], 0, {fullWidth:true})}
			</Grid>
			<Grid item xs={12} >
				{renderField(TypeFieldSchema["Trials"]["side_effects"], 0, {fullWidth:true})}
			</Grid>

      {errors["general"] && <Typography variant={"body1"} color={"error"}>{errors["general"]}</Typography>}

      <Grid container item xs={12} justifyContent="space-between">
        <Button startIcon={syncing ? <CircularProgress color={"inherit"} size={18} /> : null}
                disabled={syncing}
                aria-label={"Submit"}
                variant="contained" color="primary" onClick={saveEntity}>
          Save
        </Button>
        {entity.id && entity.id !== "0" ? <Button
          startIcon={syncing ? <CircularProgress color={"inherit"} size={18} /> : null}
          disabled={syncing}
          variant="outlined" color="secondary" onClick={deleteEntity}>
          Delete
        </Button> : null
        }
      </Grid>
    </AlternatingList>
  );

};

export default OAFormTrials;
//---OBJECT-ACTIONS-OAFORM-ENDS---//