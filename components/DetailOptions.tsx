import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useRouter } from "next/navigation";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { IconButton } from "@mui/material";

export const alasan = ["Gak Sopan", "Gk jelasss", "unfaedah"];

export default function DetailMenuPopupState({
  detail,
  saveMutate,
  saveDeleteMutate,
  deleteMutate,
  reportMutate,
  session,
  isLoadingCreatesave,
  isLoadingCreateSaveDelete,
}: any) {
  const handleReport = async (alasan: any) => {
    reportMutate({ alasan });
  };
  const router = useRouter();

  return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <IconButton {...bindTrigger(popupState)}>
              <MoreVertRoundedIcon />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              {session?.user?.id === detail?.created_by?.id && (
                <>
                  <MenuItem
                    onClick={() => {
                      router.push(`/user/post/update/${detail?.id}`);
                      popupState.close();
                    }}
                  >
                    Update
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deleteMutate(detail?.id);
                      popupState.close();
                    }}
                  >
                    Delete
                  </MenuItem>
                </>
              )}
              <PopupState variant="popover" popupId="report-popup-menu">
                {(reportPopupState) => (
                  <React.Fragment>
                    <MenuItem {...bindTrigger(reportPopupState)}>
                      Report
                    </MenuItem>
                    <Menu {...bindMenu(reportPopupState)}>
                      {alasan.map((e) => (
                        <MenuItem
                          key={e}
                          onClick={() => {
                            handleReport(e);
                            reportPopupState.close();
                            popupState.close();
                          }}
                        >
                          {e}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}
