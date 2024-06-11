import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export const alasan = ["Gak Sopan", "Gk jelasss", "unfaedah"];

export default function MenuPopupState({ mutate }: { mutate: any }) {
  const handleReport = async (alasan : any) => {
    mutate({alasan})
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState: any) => (
        <React.Fragment>
          <Button variant="outlined" color="error" {...bindTrigger(popupState)}>
            Report
          </Button>
          <Menu {...bindMenu(popupState)}>
            {alasan.map((e: any) => (
              <MenuItem key={e} onClick={() => {
                handleReport(e)
                popupState.close()
              }}>
                {e}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
