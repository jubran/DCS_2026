import { Icon } from "@iconify/react";
import { Box, Avatar, Typography, Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { secondaryFont } from "src/theme/typography";
import OperationDialogForm from "../../Dialogs/OperationDialogForm";


const getStatusColor = ( status ) =>
{
    switch ( status ) {
        case "In Service":
            return "linear-gradient(135deg, #10b981 0%, #059669 25%, #047857 75%, #065f46 100%)";
        case "Stand By":
            return "linear-gradient(135deg, #f59e0b 0%, #d97706 25%, #b45309 75%, #92400e 100%)";
        default:
            return "linear-gradient(135deg, #ef4444 0%, #dc2626 25%, #b91c1c 75%, #991b1b 100%)";
    }
};

const findMatchedUnit = ( trimmedItem, allLocationData ) =>
{
    const {
        units,
        fus,
        ft6,
        dieselTank,
        crudeTank,
        cotp_skid1,
        cotp_skid2,
        cotp,
    } = allLocationData;
    let cotpSearchArray = cotp;

    if ( !trimmedItem ) return null;

    const lowerTrimmedItem = trimmedItem.toLowerCase();
    if ( lowerTrimmedItem.includes( "skid#1" ) ) {
        cotpSearchArray = cotp_skid1;
    } else if ( lowerTrimmedItem.includes( "skid#2" ) ) {
        cotpSearchArray = cotp_skid2;
    }

    if ( trimmedItem.startsWith( "FUS#" ) ) {
        const itemNumber = trimmedItem.replace( /[^0-9]/g, "" );
        return fus.find(
            ( u ) =>
                u.location === `FUS#${ itemNumber }` ||
                u.location === `FUS#${ itemNumber }(A)` ||
                u.location === `FUS#${ itemNumber }(B)`
        );
    }

    if ( trimmedItem.startsWith( "SP#" ) ) {
        const itemNumber = trimmedItem.replace( /[^0-9]/g, "" );
        return ft6.find( ( u ) =>
        {
            const ftMatch = u.location.match( /SP#(\d+)/ );
            return ftMatch && ftMatch[ 1 ] === itemNumber;
        } );
    }

    if ( trimmedItem.startsWith( "TANK#" ) ) {
        return (
            dieselTank.find( ( u ) => u.location && u.location.trim() === trimmedItem ) ||
            crudeTank.find( ( u ) => u.location && u.location.trim() === trimmedItem )
        );
    }

    return (
        units.find( ( u ) => u.location === trimmedItem ) ||
        cotpSearchArray.find( ( u ) => u.location === trimmedItem )
    );
};

const useMatchedUnit = ( item, allLocationData ) =>
{
    return useMemo( () =>
    {
        const trimmedItem = item ? item.trim() : "";
        return findMatchedUnit( trimmedItem, allLocationData );
    }, [ item, allLocationData ] );
};

const useStatusTooltip = ( matchedUnit ) =>
{
    const tooltipBgColor = matchedUnit
        ? getStatusColor( matchedUnit.status1 )
            .split( "," )[ 3 ]
            .replace( " 100%)", "" )
            .trim()
        : "#424242";

    return {
        title: (
            <div style={ { padding: "4px 8px", textAlign: "center" } }>
                <Typography
                    variant="caption"
                    fontWeight={ 700 }
                    sx={ { color: "#ffffff" } }
                >
                    { matchedUnit?.status1 || "No Data" }
                </Typography>
            </div>
        ),
        sx: {
            [ `& .MuiTooltip-tooltip` ]: {
                backgroundColor: tooltipBgColor,
                borderRadius: 1,
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                padding: "0px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            [ `& .MuiTooltip-arrow` ]: {
                color: tooltipBgColor,
            },
        },
    };
};

const renderUnitContent = ( item, matchedUnit ) => (
    <>
        <Typography
            fontSize={ 14 }
            fontWeight={ 700 }
            noWrap
            fontFamily={ secondaryFont }
            sx={ {
                letterSpacing: "0.8px",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                lineHeight: 1,
                userSelect: "none",
                position: "relative",
                zIndex: 11,
                transition: "letter-spacing 0.3s ease",
            } }
        >
            { item }
        </Typography>
        { matchedUnit && (
            <Icon
                icon={
                    matchedUnit.status1 === "In Service"
                        ? "mdi:check-circle"
                        : matchedUnit.status1 === "Stand By"
                            ? "mdi:alert-circle"
                            : "mdi:close-circle"
                }
                style={ {
                    fontSize: 16,
                    marginTop: 4,
                    opacity: 0.8,
                    position: "absolute",
                    bottom: 3,
                    right: 4,
                    //   zIndex: 11,
                } }
            />
        ) }
    </>
);

export function ItemLocations ( { item, allLocationData, sx, ...other } )
{
    const matchedUnit = useMatchedUnit( item, allLocationData );
    const dialogData = matchedUnit || { id: item, location: "No Data", status1: "No Data" };
    const [ openDialog, setOpenDialog ] = useState( false );
    const tooltipProps = useStatusTooltip( matchedUnit );
    // const [ data, setData ] = useState( null );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    const AvatarComponent = useMemo(
        () => (
            <Avatar
                variant="rounded"
                onClick={ handleOpenDialog }
                sx={ {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1.6,
                    width: "auto",
                    height: 56,
                    background: getStatusColor( matchedUnit?.status1 ),
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    borderRadius: 1.5,
                    cursor: "pointer",
                    transition:
                        "box-shadow 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    opacity: matchedUnit ? 1 : 0.7,
                    "&:hover": {
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        transform: "scale(1.25)",
                        zIndex: 10,
                    },
                    "&::before": {},
                    "&:hover::before": {},
                } }
            >
                { renderUnitContent( item, matchedUnit ) }
            </Avatar>
        ),
        [ matchedUnit, item, tooltipProps ]
    );

    return (
        <Box
            sx={ {
                gap: 2,
                display: "flex",
                alignItems: "center",
                padding: "4px",
                ...sx,
            } }
            { ...other }
        >
            { AvatarComponent }
            <OperationDialogForm
                data={ dialogData }
                open={ openDialog } // <--- Controlled by state
                onClose={ handleCloseDialog } // <--- Function to close the dialog
            />
        </Box>
    );
}
