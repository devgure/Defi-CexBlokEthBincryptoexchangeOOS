package main

import (
	"fmt"
	"os"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/config"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/tendermint/tendermint/libs/log"
)

func main() {
	rootCmd := server.NewRootCmd(
		// AppCreator
		func(logger log.Logger, db dbm.DB, traceStore io.Writer, appOpts servertypes.AppOptions) servertypes.Application {
			return NewSunnyApp(logger, db, traceStore, true, appOpts)
		},
		// encodingConfig
		encoding.MakeConfig(ModuleBasics),
	)

	if err := client.SetCmdClientContextHandler(rootCmd, func(cmd *cobra.Command) (*client.Context, error) {
		return client.GetClientContextFromCmd(cmd)
	}); err != nil {
		panic(err)
	}

	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to execute command: %s\n", err)
		os.Exit(1)
	}
}
